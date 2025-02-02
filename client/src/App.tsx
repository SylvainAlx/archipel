import Header from "./layouts/header";
import Footer from "./layouts/footer";
import "./assets/styles/App.css";
import AppRoutes from "./router/appRoutes";

export default function App() {
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
}
