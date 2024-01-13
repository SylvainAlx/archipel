import { useEffect, useState } from "react";
import Nav from "./nav";

export default function FooterNav() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <nav
      className={`${
        visible ? "bottom-0" : "bottom-[-80px]"
      } transition-all duration-300 fixed md:hidden w-full h-[80px] py-2 flex justify-evenly items-center bg-black_alpha backdrop-blur-sm`}
    >
      <Nav />
    </nav>
  );
}
