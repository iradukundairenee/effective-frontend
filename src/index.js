import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "@google/model-viewer";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { loadStripe } from "@stripe/stripe-js/pure";
import { Elements } from "@stripe/react-stripe-js";

(async () => {
  const stripePromise = await loadStripe(
    process.env.REACT_APP_STRIPE_PUBLIC_KEY || "pk_test_51Li22MBRbGn5Mei7"
  );

  ReactDOM.render(
    <React.StrictMode>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </React.StrictMode>,
    document.getElementById("root")
  );
})();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
