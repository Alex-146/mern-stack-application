import React from "react";
import { BrowserRouter } from "react-router-dom";
import  { useRoutes } from "./routes";
import { useAuth } from "./Hooks/auth";
import { AuthContext } from "./Context/auth";

import Navbar from "./Components/Navbar";
import Loader from "./Components/Loader";

// import "materialize-css";

function App() {
  const { token, id, login, logout, ready } = useAuth();
  const isAuthorized = !!token;
  const routes = useRoutes(isAuthorized);

  if (!ready) {
    return <Loader />
  }
  
  return (
    <AuthContext.Provider value={{
      token, id, login, logout, isAuthorized
    }}>
      <BrowserRouter>
      { isAuthorized && <Navbar/> }
      <div>
        { routes }
      </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
