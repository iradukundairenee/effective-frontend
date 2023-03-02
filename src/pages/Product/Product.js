import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { useParams } from "react-router";
import { ProductTable } from "components/ProductTable";
import { useSelector } from "react-redux";
import { ProductColumns } from "components/columns";
import { getProjects } from "redux/actions/project";
import {
  getProducts,
  getDuplicates,
  deleteProduct,
} from "redux/actions/product";
import { ImagePreview } from "./ImagePreview";
import { notifier } from "utils/notifier";
import filterIcon from "../../assets/filter-icon-1.svg";
import dropdownIcon from "../../assets/dropdown.svg";

export const ProductPage = () => {
  const { projectId } = useParams();
  const [openImgView, setOpenImgView] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [action, setAction] = useState("add");
  const [confirmDel, setConfirmDel] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [assets, setAssets] = useState([]);
  const [sorted, setSorted] = useState({ sorted: "status", reversed: false });
  const [allProjects, setAllProjects] = useState([]);

  const appState = useSelector((state) => state);
  const {
    productsGet: { loading: fetching, products, loaded },
    projectsGet: { projects },
    productDuplicates: { duplicates },
    productRm: { loaded: deleted, message },
    login: {
      userInfo: { user },
    },
  } = appState;
  useEffect(() => {
    getProducts({});
    getProjects({});
  }, []);

  useEffect(() => {
    if (projectId !== undefined) {
      setCurrentItem({
        _id: projectId,
      });
      setOpenImgView(true);
      return;
    }
  }, [projectId]);

  useEffect(() => {
    if (user.role === "Client") {
      const allProjects = products.map((project) => project.project);
      setAllProjects(allProjects);
    }

    if (searchKey === "") {
      setAllProjects([]);
    }
  }, [products, user.role, searchKey]);

  useEffect(() => {
    if (loaded) {
      if (user.role === "Manager") {

        setAssets(
          products.filter((product) => product.project?.manager._id === user._id)
        );
      } else {
        setAssets(products);
      }
    }
  }, [loaded, products, user]);

  useEffect(() => {
    if (deleted) {
      notifier.success(message);
      setConfirmDel(false);
      getProducts({});
    }
  }, [deleted, message]);

  const onProductClick = (product = {}, action) => {
    setCurrentItem(product);

    if (action === "preview") {
      setOpenImgView(true);
      return;
    }
    if (action === "delete") {
      deleteProduct(product._id);
      window.location.reload(true);
      return;
    }
    setAction(action);
  };
  const getProductDuplicates = (product) => {
    getDuplicates(product._id);
    setOpen(!open);
  };

  const sortByStatus = () => {
    setSorted({ sorted: "status", reversed: !sorted.reversed });

    const assetsCopy = [...assets];
    assetsCopy.sort((asset1, asset2) => {
      if (sorted.reversed) {
        return asset1.status.localeCompare(asset2.status);
      }
      return asset2.status.localeCompare(asset1.status);
    });
    setAssets(assetsCopy);
  };

  const sortByKey = (e) => {
    const matchedCompanies = products.filter((key) => {
      return `${key.customer.companyName}-${key.customer.fullName} ${key.project.manager?.fullName}`
        .toUpperCase()
        .includes(e.target.value.toUpperCase());
    });

    const matchedProjects = projects.filter((project) => {
      return `${project.user.fullName.toUpperCase()}`.includes(
        e.target.value.toUpperCase()
      );
    });

    setAllProjects(matchedProjects);
    setAssets(matchedCompanies);
    setSearchKey(e.target.value);
  };

  const sortByProject = (project) => {
    const matchedProjects = products.filter((key) => {
      return `${key.project.name}`.includes(project.name);
    });
    setAssets(matchedProjects);
  };


  return (
    <Grid>
      <div>
        <Grid
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <Typography
            style={{
              fontSize: "24px",
              fontWeight: "700",
              fontFamily: "Poppins",
              color: "#303030",
              marginTop: "30px",
            }}
          >
            List of 3D Assets
          </Typography>

          {user.role !== "Client" ? (
            <Grid>
              <input
                className="search-asset"
                type="text"
                placeholder="Search by Company, Client or Project manager"
                value={searchKey}
                onChange={sortByKey}
              />
            </Grid>
          ) : (
            ""
          )}
          <FormControl style={{ marginTop: "20px" }}>
            <Select
              style={{
                height: "40px",
                border: "1px solid #EFF0F6",
                boxShadow: "0px 3px 16.5px rgba(8, 15, 52, 0.03)",
                borderRadius: "100px",
              }}
              defaultValue=""
              displayEmpty
              disableUnderline={true}
              IconComponent={() => <img src={dropdownIcon} alt="dropdown" />}
              disabled={allProjects.length === 0}
              renderValue={() => {
                return (
                  <Grid style={{ display: "flex", paddingLeft: "10px" }}>
                    <img src={filterIcon} alt="filter icon" />
                    <Typography
                      style={{
                        marginLeft: "5px",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Poppins",
                        color: "#303030",
                      }}
                    >
                      All projects
                    </Typography>
                  </Grid>
                );
              }}
            >
              {allProjects.map((project, projectIdx) => (
                <MenuItem
                  key={projectIdx}
                  value={project.name}
                  onClick={() => sortByProject(project)}
                >
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid>
          <ProductTable
            columns={ProductColumns(
              onProductClick,
              getProductDuplicates,
              sortByStatus,
              sorted,
              products
            )}
            loading={fetching}
            data={assets}
            open={open}
          />
        </Grid>
      </div>
      <ImagePreview
        open={openImgView}
        setOpen={setOpenImgView}
        productId={currentItem?._id}
      />
    </Grid>
  );
};
