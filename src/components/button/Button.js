import React from "react";
import{Link} from "@material-ui/core";
import {RiAddLine} from "react-icons/ri";
import '../../styles/Style.css';


export const ButtonComp = () => {
  return (
    <>
      <div style={{
        color: '#8967FC',
        width: "200px",
        marginTop: "3px",
        height: "25px",
        borderRadius: "5%",
        cursor: "pointer",
        position: "absolute",
        bottom: "2px",
        display:"flex",
fontFamily: 'Poppins',
fontStyle: "normal",
fontWeight: "700",
fontSize: "15px",
      }}>
        <div>
        <RiAddLine />
        </div>
          <Link href="/dashboard/addproposals">
          Add proposal
          </Link>
      </div>
    </>
  )
}


