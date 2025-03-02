import H1 from "../../components/titles/h1";
import AdminForm from "../../components/form/adminForm";
import AdminBanned from "../../components/admin/adminBanned";
import AdminComs from "../../components/admin/adminComs";
import { createPageTitle } from "../../utils/procedures";

export default function Admin() {
  createPageTitle("Administration");
  return (
    <>
      <H1 text="Administration" />
      <section className="w-full flex flex-wrap gap-8 items-start justify-center lg:justify-between">
        <AdminBanned />
        <AdminForm />
        <AdminComs />
      </section>
    </>
  );
}
