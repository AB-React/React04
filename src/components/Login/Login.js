import React, { useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const initialState = {
  email: "",
  passwd: "",
  emailIsValid: false,
  passwordIsValid: false,
  formIsValid: false,
};

const reducer = (prevState, action) => {
  const newState = { ...prevState };
  if (action.type === "EMAIL_CHANGED") {
    newState.email = action.payload.email;
    newState.emailIsValid = newState.email.includes("@");
  }
  if (action.type === "PASSWD_CHANGED") {
    newState.passwd = action.payload.passwd;
    newState.passwdIsValid = newState.passwd.trim().length > 6;
  }
  newState.formIsValid = newState.emailIsValid && newState.passwdIsValid;
  return newState;
};

const Login = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Card className={classes.login}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.onLogin(state.email, state.passwd);
        }}
      >
        <div className={`${classes.control} ${""}`}>
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            onChange={(e) => {
              dispatch({
                type: "EMAIL_CHANGED",
                payload: { email: e.target.value },
              });
            }}
          />
        </div>
        <div className={`${classes.control} ${""}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => {
              dispatch({
                type: "PASSWD_CHANGED",
                payload: { passwd: e.target.value },
              });
            }}
          />
        </div>
        <div className={classes.actions}>
          <Button
            disabled={!state.formIsValid}
            type="submit"
            className={classes.btn}
          >
            Login
          </Button>
          <p>Form: {state.passwd}</p>
        </div>
      </form>
    </Card>
  );
};

export default Login;
