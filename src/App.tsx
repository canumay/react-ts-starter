import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import Login from "./views/Login";
import Protected from "./views/Protected";
import Register from "./views/Register";

interface IUserState {
  emailAddress: string;
  isLoggedIn: boolean;
}

interface IUserAction {
  type: 'SET_USER_INFORMATION' | 'SET_USER_LOGGED_IN' | 'SET_USER_LOGGED_OUT';
  payload?: IUserState;
}

const UserReducer: React.Reducer<IUserState, IUserAction> = (state: IUserState, action: IUserAction) => {
  switch (action.type) {
    case "SET_USER_LOGGED_IN":
      return { ...state, ...action.payload };
    case "SET_USER_LOGGED_OUT":
      return InitialUserState;
    default:
      return state;
  }
};

const InitialUserState: IUserState = {
  emailAddress: "",
  isLoggedIn: false,
};

export const UserContext = React.createContext<{ state: IUserState | null; dispatch: React.Dispatch<IUserAction> | null }>({ state: null, dispatch: null });

function App() {
  const [state, dispatch] = useReducer(UserReducer, InitialUserState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <ProtectedRoute isLoggedIn={state.isLoggedIn} path="/">
            <Protected />
          </ProtectedRoute>
          <Redirect to="/" />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

interface IProtectedRouteProps {
  children?: React.ReactNode;
  isLoggedIn: boolean;
  path: string;
}

function ProtectedRoute({ children, isLoggedIn, path }: IProtectedRouteProps) {
  return isLoggedIn ? <Route path={path}>{children}</Route> : <Redirect to="/login" />;
}

export default App;
