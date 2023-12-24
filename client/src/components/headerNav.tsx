import Nav from "./nav";

export default function HeaderNav() {
  return (
    <nav
      className={`hidden transition-all duration-100 md:flex justify-center flex-wrap items-end gap-4`}
    >
      <Nav />
    </nav>
  );
}
