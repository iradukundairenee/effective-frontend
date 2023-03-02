import React from "react";
import{MdOutlineModeEditOutline} from 'react-icons/md';
import {FiXSquare} from 'react-icons/fi';
import {MdOutlineVisibility}  from 'react-icons/md';
import '../../styles/Style.css';


export const TableComp = () => {
 let myList=[];
  return (
    <>
      <table>
        <tr className="th">
          <td>S.No</td>
          <td>project</td>
          <td>Type</td>
          <td>Billing cycle</td>
          <td>Status</td>
          <td>Action</td>
        </tr>
        <tbody>
        <tr>
        <td className="code">01</td>
        <td className="collection" >spring collection 22</td>
        <td className="viewers">3D viewers</td>
        <td className="yearly">Yearly</td>
        <td className="status">
          pending
        </td>
        <td className="icons">
        <MdOutlineModeEditOutline/>  
        </td>
        <td className="icons"><FiXSquare /></td>
        <td className="icons"><MdOutlineVisibility/></td>
      </tr> 
         </tbody>

      </table> 

    </>
  )
}


