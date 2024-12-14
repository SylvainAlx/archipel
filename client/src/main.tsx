import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "jotai";
import { myStore } from "./settings/store.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        // v7_startTransition: true,
      }}
    >
      <Provider store={myStore}>
        <App />
      </Provider>
    </BrowserRouter>
    <ToastContainer theme="light" />
  </>,
);
