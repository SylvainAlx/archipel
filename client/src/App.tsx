import Header from "./layouts/header";
import Footer from "./layouts/footer";
import "./assets/styles/App.css";
import AppRoutes from "./router/appRoutes";
import useDebugAtom from "./hooks/useDebugAtom";
import { SERVER_URL } from "./settings/consts";

export default function App() {
  SERVER_URL && SERVER_URL.includes("localhost") && useDebugAtom();
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
}
