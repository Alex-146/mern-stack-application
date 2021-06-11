
import { createContext } from "react";

function nop() {}

export const AuthContext = createContext({
  token: null,
  id: null,
  login: nop,
  logout: nop,
  isAuthorized: false
});