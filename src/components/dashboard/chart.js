import { Grid, Typography } from "@material-ui/core";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { ImagePreview } from "../../pages/Product/ImagePreview";
import { useParams } from "react-router";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const Chart = ({ viewsByDate, views, user }) => {
  const classes = styles();
  const [assetCounts, setAssetCounts] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const[previewAssetsId, setPreviewAssetsId] = useState(null);
  const [buttons, setButtons] = useState([]);
  const [openImgView, setOpenImgView] = useState(false);
  const { projectId } = useParams();
  const [labels, setLabels] = useState([]);
  useEffect(() => {
    if (projectId !== undefined) {
      setCurrentItem({
        _id: projectId,
      });
      setOpenImgView(true);
      return;
    }
  }, [projectId]);
  const countAssets = (array, key, key2) => {
    let toChart = [];
    array.forEach((x) => {
      if (
        toChart.some((val) => {
          return val[key] === x[key];

        })
      ) {
        toChart.forEach((k) => {
          if (k[key] === x[key]) {
            k["counted"]++;
          }
        });
      } else {
        let a = {};
        a[key] = x[key];
        a[key2] = x[key2];
        a["counted"] = 1;
        toChart.push(a);
      }
    });

    return toChart;
  };
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Dataset 2",
        data: assetCounts.map((item) => item.counted),
        borderColor: "#8967FC",
        backgroundColor: "rgba(137, 103, 252, 0.3)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      color: "#000",
      title: {
        display: false,
      },
    },
  };
  const onClickItem=(item)=>{
    setPreviewAssetsId(item._id)
      setOpenImgView(true);
      return;
    
  };
 

  useEffect(() => {

    if (views) {
    
      if (user.role === "Manager") {
        setAssetCounts(
          countAssets(
            views
              .filter((view) => {
                return (
                  view.product && view.product.project.manager === user._id
                );
              })
              .map((item) => item.product),
            "name",
            "_id"
          )
        );
      } else {
        setAssetCounts(
          countAssets(
            views.map((item) => item.product),
            "name",
            "_id"
          )
        );
      }
    }
  }, [user, views, viewsByDate]);
  useEffect(() => {
    if (assetCounts) setLabels(assetCounts.map((item) => ""));
  }, [assetCounts]);
 
  return (
    <>
       <Grid className={classes.chart}>
      <Line options={options} data={data} />
     <div  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',cursor:'pointer',color:'gray',fontSize:'15px'}}>
     {assetCounts.map((item)=>{
     return <div onClick={()=>onClickItem(item)}>{item.name}</div>
    })}
   </div>
     
    </Grid>
    <ImagePreview
    open={openImgView}
    setOpen={setOpenImgView}
    productId={previewAssetsId}
  />
    </>
  );
};