import Calc1 from "../calcs/calc1/Calc1";
import Calc2 from "../calcs/calc2/Calc2";
import { CALC1_ROUTE, CALC2_ROUTE } from "./consts";

export const AuthRoutes = [
  {
    path: CALC1_ROUTE,
    Component: Calc1
  },
  {
    path: CALC2_ROUTE,
    Component: Calc2
  }
]

export const PublicRoutes = [ 

]