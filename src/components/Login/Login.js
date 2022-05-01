import React from "react";
import AuthContext from "../../context/auth-context";
import Card from "../UI/Card/Card";
import classes from "./Login.module.sass";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import react from "react";

const initialState = {
  email: "",
  passwd: "",
  emailIsValid: false,
  passwdIsValid: false,
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

const Login = () => {
  const authCtx = React.useContext(AuthContext);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const emailRef = react.useRef();
  const passwdRef = react.useRef();

  return (
    <Card className={classes.login}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (state.formIsValid) {
            authCtx.loginHandler(state.email, state.passwd);
          } else if (!state.emailIsValid) {
            emailRef.current.focus();
          } else {
            passwdRef.current.focus();
          }
        }}
      >
        <Input
          ref={emailRef}
          isValid={state.emailIsValid}
          label="E-Mail"
          type="email"
          id="email"
          value={state.value}
          onChange={(e) => {
            dispatch({
              type: "EMAIL_CHANGED",
              payload: { email: e.target.value },
            });
          }}
        />
        <Input
          ref={passwdRef}
          isValid={state.passwdIsValid}
          label="Password"
          type="password"
          id="password"
          onChange={(e) => {
            dispatch({
              type: "PASSWD_CHANGED",
              payload: { passwd: e.target.value },
            });
          }}
        />
        <div className={classes.actions}>
          <Button
            // disabled={!state.formIsValid}
            type="submit"
            className={classes.btn}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
