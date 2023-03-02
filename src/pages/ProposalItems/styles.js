import { makeStyles } from '@material-ui/core/styles';

export const useEditModelStyles = makeStyles(() => ({

  editModel: {
    top: 0,
    left: 0,
    opacity: 0.5,
    zIndex: '2',
    width: '100%',
    height: '100vh',
    position: 'absolute',
    backgroundColor: '#3b2b6d',
  },
  main: {
    top: '40vh',
    zIndex: '3',
    width: '50%',
    padding: '2%',
    left: '50vh',
    position: 'absolute'
  },
  nameInputContainer: {
    width: '100%',
    display: 'grid',
    margin: "25px 0",
    justifyContent: "space-around",
    gridTemplateColumns: '50% 18% 10%'
  },
  inputTitle: {
    fontSize: '20px',
    fontWeight: 400,
  },
  currInput: {
    margin: '10px 0',
    padding: '4px 8px',
    borderRadius: '5px',
    border: '1px solid #dad0fa',
  },

  selectInput: {
    width: '100%',
    margin: '10px 0',
    padding: '10px 8px',
    borderRadius: '5px',
    backgroundColor: 'white',
    border: '1px solid #dad0fa',
  },
  actions: {
    justifyContent: 'flex-end',
  },
  cancel: {
    fontSize: "18px",
    color: "#8967FC",
    fontWeight: "500",
    fontFamily: 'Poppins',
    textDecoration: "none",
  },
  submit: {
    color: "white",
    fontSize: "18px",
    fontWeight: "500",
    fontFamily: 'Poppins',
    textDecoration: "none",
    backgroundColor: "hsl(254, 96%, 70%)",
    '&:hover': {
      backgroundColor: "hsl(254, 56%, 70%)",
    }
  },
  hidden: {
    height: 0,
    width: 0,
    display: 'none'
  },
}));

