import React from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiBarChartSquare, BiDollarCircle } from "react-icons/bi";
import { RiCoupon3Line, RiWaterFlashFill } from "react-icons/ri";
import { HiOutlineClipboardList } from "react-icons/hi";
import { IoPeopleOutline, IoReceiptOutline } from "react-icons/io5";
import { TbFiles } from "react-icons/tb";
import { FiPackage } from "react-icons/fi";
import { useSelector } from "react-redux";
import { BsListStars } from "react-icons/bs";

import "./style.css";

export const SideBar = () => {
  const appState = useSelector((state) => state);

  const {
    login: {
      userInfo: { user },
    },
  } = appState;

  const items = [
    {
      link: "home",
      title: "Dashboard",
      index: 0,
      icon: <AiOutlineDashboard />,
    },
    {
      link: "analytics",
      title: "Analytics",
      index: 1,
      icon: <BiBarChartSquare />,
    },
    { link: "products", title: "3D assets", index: 2, icon: <FiPackage /> },
    {
      link: "projects",
      title: "Projects",
      index: 3,
      icon: <HiOutlineClipboardList />,
    },
    { link: "quotes", title: "Proposals", index: 4, icon: <TbFiles /> },
    {
      link: "invoices",
      title: "Invoices",
      index: 5,
      icon: <IoReceiptOutline />,
    },
    {
      link: "subscriptions",
      title: "Subscriptions",
      index: 6,
      icon: <BiDollarCircle />,
    },
    { link: "crm", title: "CRM", index: 7, icon: <IoPeopleOutline /> },
    { link: "coupons", title: "Coupons", index: 8, icon: <RiCoupon3Line /> },
    {
      link: "currencies",
      title: "Currency",
      index: 9,
      icon: <BiDollarCircle />,
    },
    {
      link: "loyaltypoints",
      title: "Loyalty Points",
      index: 10,
      icon: <RiWaterFlashFill />,
    },
    {
      link: "items",
      title: "Proposal Items",
      index: 10,
      icon: <BsListStars />,
    },
  ];

  const managerItems = [
    {
      link: "home",
      title: "Dashboard",
      index: 0,
      icon: <AiOutlineDashboard />,
    },
    {
      link: "analytics",
      title: "Analytics",
      index: 1,
      icon: <BiBarChartSquare />,
    },
    { link: "products", title: "3D assets", index: 2, icon: <FiPackage /> },
    {
      link: "projects",
      title: "Projects",
      index: 3,
      icon: <HiOutlineClipboardList />,
    },
    { link: "quotes", title: "Proposals", index: 4, icon: <TbFiles /> },
    {
      link: "invoices",
      title: "Invoices",
      index: 5,
      icon: <IoReceiptOutline />,
    },
    { link: "crm", title: "CRM", index: 7, icon: <IoPeopleOutline /> },
  ];

  const clientItems = [
    {
      link: "home",
      title: "Dashboard",
      index: 0,
      icon: <AiOutlineDashboard />,
    },
    {
      link: "analytics",
      title: "Analytics",
      index: 1,
      icon: <BiBarChartSquare />,
    },
    { link: "products", title: "3D assets", index: 2, icon: <FiPackage /> },
    {
      link: "projects",
      title: "Projects",
      index: 3,
      icon: <HiOutlineClipboardList />,
    },
    { link: "quotes", title: "Proposals", index: 4, icon: <TbFiles /> },
    {
      link: "invoices",
      title: "Invoices",
      index: 5,
      icon: <IoReceiptOutline />,
    },
    {
      link: "subscriptions",
      title: "Subscriptions",
      index: 6,
      icon: <BiDollarCircle />,
    },
  ];

  return (
    <div>
      <ProSidebar style={user.role !== 'Admin' ? { marginTop: '14vh' } : { marginTop: '10vh' }}>
        <Menu style={user.role === 'Admin' ? { padding: '2% 1%' } : { padding: '8% 1%' }}>
          {user.role === "Admin"
            ? items.map((item) => (
              <MenuItem style={{ padding: '0', margin: '-2% 0' }} key={item.index} icon={item.icon}>
                {item.title}
                <Link to={`/dashboard/${item.link}`} />
              </MenuItem>
            ))
            : user.role === "Manager"
              ? managerItems
                .map((item) => (
                  <MenuItem style={{ padding: '0%' }} key={item.index} icon={item.icon}>
                    {item.title}
                    <Link to={`/dashboard/${item.link}`} />
                  </MenuItem>
                ))
              : clientItems.map((item) => (
                <MenuItem style={{ padding: '0%' }} key={item.index} icon={item.icon}>
                  {item.title}
                  <Link to={`/dashboard/${item.link}`} />
                </MenuItem>
              ))}
        </Menu>
      </ProSidebar>
    </div>
  );
};

export default SideBar;
