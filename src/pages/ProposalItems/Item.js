import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getItems } from "redux/actions/item";
import { ItemColumns } from "components/columns";
import { CreateItem } from "./CreateAndUpdateItems";
import { ItemTable } from "components/CustomizedTable/ItemTable";

export const ItemsPage = () => {
  const [item, setItem] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [action, setAction] = useState('add')
  const itemState = useSelector((state) => state);

  const {
    getItems: { loading, items },
    login: {
      userInfo: {
        user
      }
    }
  } = itemState;

  useEffect(() => {
    getItems();
  }, []);
  const itemsPerPage = 5;

  return (
    <div>
      <p className="title">All Items</p>
      <ItemTable
        columns={ItemColumns({ setItem, setIsOpen, setAction })}
        loading={loading}
        data={items}
        withPagination
        dataCount={items.length}
        pageCount={itemsPerPage}
        user={user}
        setIsOpen={setIsOpen}
        setAction={setAction}
      />
      <CreateItem
        item={item}
        isOpen={isOpen}
        action={action}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};
