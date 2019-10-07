import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
//import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Util from './Server/Util'

const darktheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

const lighttheme = createMuiTheme({
  palette: {
    type: 'light'
  }
});

function theApp() {
  let util : Util = new Util();
  let theme = util.getCookie("theme");
  return(
    <Router>
        <MuiThemeProvider theme={ theme === "light" ? lighttheme : darktheme} >
            <App />
        </MuiThemeProvider>
    </Router> 
  )
}

ReactDOM.render(
  theApp()

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
///serviceWorker.unregister();
