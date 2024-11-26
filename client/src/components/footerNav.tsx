import Nav from "./nav";

export default function FooterNav() {
  // const [prevScrollPos, setPrevScrollPos] = useState(0);
  // const [visible, setVisible] = useState(true);

  // const handleScroll = () => {
  //   const currentScrollPos = window.scrollY;

  //   if (currentScrollPos > prevScrollPos) {
  //     setVisible(false);
  //   } else {
  //     setVisible(true);
  //   }

  //   setPrevScrollPos(currentScrollPos);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // });

  return (
    <nav
      className={`bottom-0 transition-all duration-500 fixed md:hidden w-full h-[70px] flex justify-evenly items-center pt-2 bg-black_alpha backdrop-blur-sm`}
    >
      <Nav />
    </nav>
  );
}
