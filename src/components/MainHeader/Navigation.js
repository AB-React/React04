import React from "react";
import AuthContext from "../../context/auth-context";

import classes from "./Navigation.module.css";

const Navigation = () => {
  const authCtx = React.useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {authCtx.isLoggedIn && (
          <>
            <li>
              <a href="/">Users</a>
            </li>
            <li>
              <a href="/">Admin</a>
            </li>
            <li>
              <button onClick={authCtx.logoutHandler}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
