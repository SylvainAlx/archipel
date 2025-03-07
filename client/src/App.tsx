import Header from "./layouts/header";
import Footer from "./layouts/footer";
import "./assets/styles/App.css";
import Router from "./router/router";
import useDebugAtom from "./hooks/useDebugAtom";

export default function App() {
  useDebugAtom();

  return (
    <>
      <Header />
      <Router />
      <Footer />
    </>
  );
}
