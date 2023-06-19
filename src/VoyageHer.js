import { NavBar } from "./components/nav/NavBar";
import { ApplicationViews } from "./components/views/ApplicationViews";
import { useSuppressResizeError } from "./useSuppressResizeError";

export const VoyageHer = () => {
  useSuppressResizeError();
  return (
    <>
      <NavBar />
      <ApplicationViews />
    </>
  );
};
