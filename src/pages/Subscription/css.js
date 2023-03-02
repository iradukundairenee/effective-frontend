import { makeStyles } from "@material-ui/core/styles";

export const cssStyle = makeStyles({
  root: {
    margin: "30px 0",
    fontFamily: "Poppins",
  },
  nav: {
    display: "flex",  
    justifyContent: "space-between",
    marginBottom: "30px",
  },
  paper: {
    display: "flex",
  },
  backArrow: {
    color: "#8967fc",
    fontSize: "30px",
    marginRight: "5px",
  },
  title: {
    fontFamily: "Poppins",
    fontWeight: 700,
    fontSize: "24px",
    color: "#303030",
    marginLeft: "2px",
    marginTop: "5px",
  },
  actionButtons: {
    border: "1px solid #EFF0F6",
    boxShadow: "0px 3px 16.5px rgba(8, 15, 52, 0.03)",
    borderRadius: "100px",
    marginLeft: "10px",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "14px",
    padding: "10px 30px",
  },
  sendActionButton: {
    border: "1px solid #EFF0F6",
    boxShadow: "0px 3px 16.5px rgba(8, 15, 52, 0.03)",
    borderRadius: "100px",
    marginLeft: "10px",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "14px",
    padding: "10px 30px",
    background: "#8967FC",
    color: "#fff",
    '&:hover, &:focus': {
      color: "#8967FC",
    }
  },
  itemActionBtn: {
    color: "#8967FC",
    border: "1px solid #8967FC",
    borderRadius: "100px",
    padding: "10px 20px",
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "16px",
    marginTop: "20px",
    marginRight: "20px",
  },
  table: {
    boxShadow: "0px 0px 14px rgba(201, 215, 223, 0.2)",
    borderRadius: "10px",
  },
  totalRow: {
    fontFamily: "Poppins",
    fontWeight: 700,
    fontSize: "16px",
    color: "#8967FC",
    textAlign: "justify",
    paddingLeft: "30px"
  },
  card: {
    marginTop: "30px",
    boxShadow: "0px 0px 14px rgba(201, 215, 223, 0.2)",
    borderRadius: "10px",
  },
  cardTitle: {
    fontFamily: "Poppins",
    fontWeight: 600,
    fontSize: "16px",
    color: "#303030",
    padding: "10px 20px",
  },
  cardContent: {
    fontFamily: "Poppins",
    fontSize: "14px",
    color: "#7D7D7D",
    padding: "10px 20px",
  },
  addItemBtn: {
    background: "#8967FC",
    color: "#fff",
    border: "2px solid #8967FC",
    borderRadius: "100px",
    padding: "10px 20px",
    fontFamily: "Poppins",
    fontWeight: 500,
    fontSize: "16px",
    marginTop: "20px",
    '&:hover, &:focus': {
      color: "#8967FC",
    }
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "640px",
    background: "#fff",
    border: "0.75px solid #EFF0F6",
    boxShadow: "0px 3px 16.5px rgba(8, 15, 52, 0.03)",
    borderRadius: "7.5px",
  },
  modalTitle: {
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "24px",
    color: "#303030",
    margin: "10px",
  },
  inputName: {
    border: "0.75px solid #EFF0F6",
    boxShadow: "0px 3px 16.5px rgba(8, 15, 52, 0.03)",

    padding: "10px",
    margin: "10px",
    width: "85%",
    fontFamily: "Poppins",
    fontSize: 14,
  },
  inputNumber: {
    border: "0.75px solid #EFF0F6",
    boxShadow: "0px 3px 16.5px rgba(8, 15, 52, 0.03)",
    borderRadius: "100px",
    padding: "10px",
    margin: "10px",
    width: "40%",
    fontFamily: "Poppins",
    fontSize: 14,
  },
  modalButton: {
    border: "1px solid #EFF0F6",
    boxShadow: "0px 3px 16.5px rgba(8, 15, 52, 0.03)",
    borderRadius: "10px",
    margin: "3% 20px",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "14px",
    padding: "10px 25px",
    background: "#8967FC",
    color: "#fff",
  },
  taxDialogTitle: {
    fontWeight: '600',
    fontSize: '1.5rem',
    lineHeight: '1.5rem',
    marginTop: '2%',
    marginBottom: '3%'
  },
  taxDialogError: {
    fontSize: '1rem',
    lineHeight: '1rem',
    marginTop: '2%',
    marginBottom: '2%',
    color: 'red'
  },
  addItemBtnHover: {
    color: "#8967FC",
  },
  hidden: {

    height: 0,
    width: 0,
    display: 'none'
  },
  editButton: {
    color: '#7D7D7D',
    width: '1.8rem',
    height: '2rem',
    '&:hover, &:focus': {
      color: "#8967FC",
    }
  },
  deleteButton: {
    width: '1.8rem',
    height: '1.8rem',
    color: '#7D7D7D',
    '&:hover, &:focus': {
      color: "red",
    }
  },

  buttonDisabled: {
    cursor: 'not-allowed',
    color: "#b6a2fc",
    pointerEvents: 'none',
    border: "1px solid #b6a2fc",
  },
  comments: {
    background: "#8967FC",
    marginLeft:"auto",
    borderRadius: "20px 0 20px 20px",
    padding: "15px 20px",
    marginRight: "10px",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "16px",
    color: "#fff",
    maxWidth:"70%"
  },
  commentDate: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "10px",
    fontFamily: "Poppins",
    fontWeight: 300,
    fontSize: "12px",
    color: "#303030",
  },
  myCommentsName: {
    marginLeft: "10px",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "15px",
    color: "black",

  },
  CommentsName:{
    marginRight:"10px",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "15px",
    color: "black",
    display:'flex',
    justifyContent:"flex-end"
  },
  myComments: {
    background: "#DFE6EC",
    borderRadius: "0px 20px 20px 20px",
    padding: "15px 20px",
    marginLeft: "10px",
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: "16px",
    color: "#7D7D7D",
    maxWidth:"70%"
  },
  commentPositionRight:{
    display: "flex",
    justifyContent: "flex-end",
  },
  commentPositionLeft:{
    display: "flex",
    marginRight: "20px",
    justifyContent: "flex-start"
  },
  commentTime:{
    fontFamily: "Poppins",
    fontWeight: 300,
    fontSize: "12px",
    color: "#303030",
  },
  commentTimeRight:{
    textAlign: "right",
    paddingRight: "10px",
  },
  commentTimeLeft:{
    paddingLeft: "10px",
    
  }
});


