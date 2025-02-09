import Header from "./layouts/header";
import Footer from "./layouts/footer";
import "./assets/styles/App.css";
import AppRoutes from "./router/appRoutes";
import useDebugAtom from "./hooks/useDebugAtom";
import { SERVER_URL } from "./settings/consts";
import useNotification from "./hooks/useNotification";

export default function App() {
  SERVER_URL.includes("localhost") && useDebugAtom();
  const { permission, showNotification } = useNotification();
  return (
    <>
      <Header />
      <button
        onClick={() =>
          showNotification("Hello ! 🚀", {
            body: "Ceci est une notification test",
            icon: "/android-chrome-192x192.png",
            silent: true,
            actions: [
              {
                action: "dismiss",
                title: "Fermer",
              },
            ],
          })
        }
        disabled={permission != "granted"}
      >
        TEST NOTIFICATION
      </button>
      <AppRoutes />
      <Footer />
    </>
  );
}
