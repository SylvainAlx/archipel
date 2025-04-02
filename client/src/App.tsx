import Header from "./layouts/header";
import Footer from "./layouts/footer";
import "./assets/styles/App.css";
import Router from "./router/router";
import useDebugAtom from "./hooks/useDebugAtom";
import { useCookiesModal } from "./hooks/modalsHooks/useCookiesModal";
import CookiesModal from "./views/modals/cookiesModal";
import useScrollToTop from "./hooks/useScrollToTop";

export default function App() {
  useDebugAtom();
  useScrollToTop();
  const { showCookiesModal } = useCookiesModal();

  return (
    <>
      <Header />
      <Router />
      <Footer />
      {showCookiesModal && <CookiesModal />}
    </>
  );
}
