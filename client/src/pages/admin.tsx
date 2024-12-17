import H1 from "../components/titles/h1";
import AdminForm from "../components/form/adminForm";
import AdminParams from "../components/admin/adminParams";
import AdminBanned from "../components/admin/adminBanned";
import AdminComs from "../components/admin/adminComs";

export default function Admin() {
  return (
    <>
      <H1 text="Administration" />
      <section className="w-full flex flex-wrap gap-8 items-start justify-center lg:justify-between">
        <AdminParams />
        <AdminBanned />
        <AdminForm />
        <AdminComs />
      </section>
    </>
  );
}
