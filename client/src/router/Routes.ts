import Calc1 from "../calcs/calc1/Calc1";
import Calc2 from "../calcs/calc2/Calc2";
import Calc3 from "../calcs/calc3/Calc3";
import About from "../components/About/About";
import { ABOUT_ROUTE, CALC1_ROUTE, CALC2_ROUTE, CALC3_ROUTE } from "./consts";

export const AuthRoutes = [
  {
    path: CALC1_ROUTE,
    Component: Calc1
  },
  {
    path: CALC2_ROUTE,
    Component: Calc2
  },
  {
    path: CALC3_ROUTE,
    Component: Calc3
  },
  {
    path: ABOUT_ROUTE,
    Component: About
  },
]

export const PublicRoutes = [ 

]