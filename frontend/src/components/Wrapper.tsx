import { ReactNode } from "react";
import Navbar from "./Navbar";

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Wrapper;
