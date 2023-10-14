import { Home, Login, UserProfile } from '../pages';
import { Navbar, NotFound } from './';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Register from '../pages/Register';
import Settings from '../pages/Settings';
import { LOCALSTORAGE_TOKEN_KEY, getItemFromLocalStorage } from '../utils';
import { useAuth } from '../hooks';

const PrivateRoute = ({children, ...rest}) => {
  return (
    <Route  
      {...rest}
      render = {() => {
        if(getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY)){
          return children;
        }else{
          return <Redirect to = "/login"/>
        }
      }}
    />
  )

}

function App() {
  const auth = useAuth();
  return (
    <div className="App">
      <Router>
        <Navbar />
        <ToastContainer
          newestOnTop = {true}
          position="top-left"
        />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <PrivateRoute exact path="/settings">
            <Settings />
          </PrivateRoute>
          <PrivateRoute exact path="/user/:userId">
            <UserProfile />
          </PrivateRoute>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
