import { useRoutes } from "react-router-dom";
import { routeData } from "../../constant/data";

const RootRoutes = () => {
  return useRoutes(routeData);
};

export default RootRoutes;
