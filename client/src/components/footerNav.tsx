import Nav from "./nav";

export default function FooterNav() {
  return (
    <nav
      className={`fixed bottom-0 md:hidden w-full h-[80px] py-2 flex justify-evenly items-center bg-black_alpha backdrop-blur-sm`}
    >
      <Nav />
    </nav>
  );
}
