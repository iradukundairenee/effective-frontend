import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@material-ui/styles";
import { renderRoutes } from "react-router-config";
import { store } from "./redux/store";
import routes from "./routes";
import theme from "./theme";

const App = () => {
  const history = createBrowserHistory();
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider store={store}>
        <ToastContainer />
        <Router history={history}>{renderRoutes(routes)}</Router>
      </StoreProvider>
    </ThemeProvider>
  );
};

export default App;
