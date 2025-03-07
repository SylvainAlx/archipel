import { useNavigate } from "react-router-dom";
import { VERSION } from "../../settings/consts";

interface ReleaseNotesLinkProps {
  smallSize?: boolean;
}

export default function ReleaseNotesLink({
  smallSize = false,
}: ReleaseNotesLinkProps) {
  const navigate = useNavigate();
  return (
    <div
      className={`${smallSize ? "text-[12px]" : "text-sm"} cursor-pointer hover:text-secondary`}
      onClick={() => navigate("/releasenotes")}
    >
      {VERSION.beta != "" && "BETA-" + VERSION.beta}
      {VERSION.rc != "" && "RC-" + VERSION.rc}
      {VERSION.release != "" && "v" + VERSION.release}
    </div>
  );
}
