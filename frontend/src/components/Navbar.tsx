import React, { ReactNode, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

const Navbar = () => {
  const [isResponsiveNavVisible, setResponsiveNavVisible] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setResponsiveNavVisible(true);
      } else {
        setResponsiveNavVisible(false);
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <ResponsiveNav />
        <div
          className={`flex gap-12 ${isResponsiveNavVisible ? "hidden" : ""}`}
        >
          {links.map(
            (link): ReactNode => (
              <Link
                to={link.href}
                key={link.href}
                className="text-gray-700 transition-colors duration-300 hover:text-gray-900"
              >
                {link.title}
              </Link>
            )
          )}
        </div>
        <div
          className={`flex items-center gap-4 ${
            isResponsiveNavVisible ? "hidden" : ""
          }`}
        >
          <Input placeholder={"Search something ?"} />
        </div>
      </div>
    </nav>
  );
};

function ResponsiveNav(): React.JSX.Element {
  return (
    <div className="sm:hidden">
      <Sheet>
        <SheetTrigger>
          <RxHamburgerMenu size={30} />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <div className="flex flex-col items-center justify-center gap-6 p-4">
            <Input placeholder={"Search something ?"} />
            {links.map(
              (link): ReactNode => (
                <Link
                  to={link.href}
                  key={link.href}
                  className="text-gray-700 transition-colors duration-300 hover:text-gray-900"
                >
                  {link.title}
                </Link>
              )
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Navbar;
