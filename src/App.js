import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Route, Link as RouterLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import SettingsIcon from '@material-ui/icons/Settings';
import Util from './Server/Util'
import BookmarksPanel from './BookmarksPanel'
import HomePanel from './Components/HomePanel'
import BlogPanel from './Components/BlogPanel'

import { blue, indigo } from '@material-ui/core/colors'

const drawerWidth = 240;

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
});


//const useStyles = makeStyles((theme: Theme) =>
//  createStyles({

const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  title : {
    flexGrow : 1
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
});

class App extends Component {

  state = {
    usertoken: "",
    bookmarks : [],
    searchWord: "",
    searchTag: "",
    pageSize: 50,
    currentPage: 1,
  }

  componentDidMount() {
    this.updateToken() 
  }

  handleHomeClick = ( ) => {
    this.setState( { panel: 0, })
  }

  handleBlogClick = ( ) => {
    this.setState( { panel: 1 })
  }
  handleBookmarkClick = ( ) => {
    this.setState( { panel: 2,   })
  }
  handleSettingsClick = ( ) => {
    this.setState( { panel: 3,   })
  }

  clearToken = () => {
    let util = new Util()
    let usertok = util.getCookie("usertoken");
    if( usertok !== null && usertok !== '' ) {
      // Deleting usertoken value
      console.log( document.cookie );
      this.setState( { usertoken: "", bookmarks: [] } )
      util.deleteCookie( "usertoken" )

    }
  }

  updateToken() {
    let util = new Util();
    let t = util.getCookie( 'usertoken' );
    if( t !== null && t != "" ) {
      console.log( 'Setting token in state:'+t)
      this.setState( {usertoken : t } );
    }
  }

  getUserToken() {
    return this.state.usertoken;
  }

  //loginElement = (
  //  <LoginDlg color="inherit" usertoken={ this.state.usertoken } clearToken={ this.clearToken.bind(this) } updateToken={ this.updateToken.bind(this) } />
  //);

  render() {
    const { classes } = this.props;
 
    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
          >
            <div className={classes.toolbar} />
            <Divider />

            <List>
              <ListItem button>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <Link component={RouterLink} to="/">
                  Home
                </Link>
              </ListItem>
              <ListItem button >
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <Link component={ RouterLink } to="/blog">
                  Blog
                </Link>
              </ListItem>
              <ListItem button>
                <ListItemIcon><BookmarksIcon /></ListItemIcon>
                <Link component={ RouterLink } to="/bookmarks">
                  Bookmarks
                </Link>
              </ListItem>
              <ListItem button>
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <Link component={ RouterLink } to="/settings">
                  Settings
                </Link>
              </ListItem>
            </List>
          </Drawer>

          <main className={classes.content}>
            <div className={classes.toolbar} />

            <Route path="/" exact render={ (props) => < HomePanel {...props} 
                    usertoken={ this.state.usertoken } clearToken={ this.clearToken.bind(this) } updateToken={ this.updateToken.bind(this)}/> }/>
            <Route path="/blog" render={ (props) => < BlogPanel {...props} 
                    usertoken={ this.state.usertoken } clearToken={ this.clearToken.bind(this) } updateToken={ this.updateToken.bind(this)}/> }/>
            <Route path="/bookmarks" render={ (props) => < BookmarksPanel {...props} 
                    usertoken={ this.state.usertoken } clearToken={ this.clearToken.bind(this) } updateToken={ this.updateToken.bind(this)} /> }/>

          </main>

        </MuiThemeProvider>        
      </div>
    )
  }
}

export default withRouter( withStyles(useStyles)( App ) );
