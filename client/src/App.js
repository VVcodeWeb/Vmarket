import './App.scss';
import React from "react"
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import NavBar from "./components/NavBar"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import home from "./pages/home"
import products from "./pages/products"
import userProfile from "./pages/userProfile"
import login from './pages/login';
import signup from "./pages/signup"
import categories from "./pages/categories"
import postItem from "./pages/postproduct"
import PageNotFound from "./pages/notfound"
const theme = createMuiTheme({
  palette:{
    primary: {
      main: "#041E42",
      light: "#0065FF"
    },
    secondary: {
      main: "#FFC220"
    },
    white: {
      main: "#fff"
    }
  }
})


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={home} />
            <Route exact path="/user/:userhandle" component={userProfile} />
            <Route exact path="/user/:userhandle/sellitem" component={postItem} /> 
            <Route exact path="/allproducts" component={products} />
            <Route exact path="/product/:product_id" component={products} />
            <Route exact path="/category/:category_id" component={categories} />
            <Route exact path="/login" component={login} />
            <Route exact path="/signup" component={signup} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
        
      </div>
    </MuiThemeProvider>
  );
}

export default App;
