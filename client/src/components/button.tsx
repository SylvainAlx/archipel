import { useNavigate } from "react-router-dom";
import { ButtonProps } from "../utils/types";
import { DeleteSelfFetch } from "../utils/fetch";

export default function Button({ path, text }: ButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path === "logout") {
      if (window.confirm(`Souhaitez-vous vous déconnecter ?`)) {
        localStorage.removeItem("jwt");
        navigate("/");
        window.location.reload();
      }
    } else if (path === "delete") {
      if (
        window.confirm(
          `Confirmez-vous la suppression définitive de votre nation ?`
        )
      ) {
        DeleteSelfFetch()
          .then((resp) => {
            alert(resp.message);
            localStorage.removeItem("jwt");
            navigate("/");
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      navigate(path);
    }
  };

  return (
    <button
      className="inline-block rounded-lg px-3 py-2 text-xs font-medium bg-white text-black"
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
