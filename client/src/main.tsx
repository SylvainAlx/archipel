import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "jotai";
import { myStore } from "./settings/store.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactGA from "react-ga4";
import { GOOGLE_ANALYTICS_MEASUREMENT_ID } from "./settings/consts.ts";

ReactGA.initialize(GOOGLE_ANALYTICS_MEASUREMENT_ID);
ReactGA.send("pageview");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <Provider store={myStore}>
        <App />
      </Provider>
    </BrowserRouter>
    <ToastContainer theme="light" />
  </>,
);
