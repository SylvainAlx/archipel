import { useAtom } from "jotai";
import { Nation } from "../types/typNation";
import { Place } from "../types/typPlace";
import { User } from "../types/typUser";
import AdminBanButton from "./buttons/adminBanButton";
import AdminReportButton from "./buttons/adminReportButton";
import ReportButton from "./buttons/reportButton";
import { sessionAtom } from "../settings/store";
import ReportedFlag from "./reportedFlag";

interface ReportPanelProps {
  content: User | Nation | Place;
}

export default function ReportPanel({ content }: ReportPanelProps) {
  const [session] = useAtom(sessionAtom);

  return (
    <section className="flex flex-col items-center justify-center gap-2">
      {content.reported && <ReportedFlag />}
      {session.user.role != "admin" ? (
        !content.reported && (
          <ReportButton contentOfficialId={content.officialId} />
        )
      ) : content.reported ? (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <AdminReportButton
            contentOfficialId={content.officialId}
            reverse={true}
          />
          {content.banished ? (
            <AdminBanButton
              contentOfficialId={content.officialId}
              reverse={true}
            />
          ) : (
            <AdminBanButton contentOfficialId={content.officialId} />
          )}
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-2">
          <AdminReportButton contentOfficialId={content.officialId} />
        </div>
      )}
    </section>
  );
}
