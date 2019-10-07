import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withTheme } from '@material-ui/styles';
import { createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Route, Link as RouterLink } from 'react-router-dom';
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
import SettingsPanel from './Components/SettingsPanel'

const drawerWidth = 240;

  const useStyles =( {spacing, palette,mixins} : Theme) => createStyles({
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
  toolbar: mixins.toolbar,
  title : {
    flexGrow : 1
  },
  content: {
    flexGrow: 1,
    backgroundColor: palette.background.default,
    padding: spacing(3),
  },
});

interface AppProps extends WithStyles<typeof useStyles> {
};

class App extends Component< AppProps, {} > {
  util : Util = new Util();

  state = {
    usertoken: "",
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
    let usertok = this.util.getCookie("usertoken");
    if( usertok !== null && usertok !== '' ) {
      // Deleting usertoken value
      console.log( document.cookie );
      this.setState( { usertoken: "" } )
      this.util.deleteCookie( "usertoken" )

    }
  }

  updateToken() {
    let t = this.util.getCookie( 'usertoken' );
    if( t !== null && t != "" ) {
      console.log( 'Setting token in state:'+t)
      this.setState( {usertoken : t } );
    }
  }

  setTheme( newtheme: string ) {
    this.util.setCookie( "theme", newtheme, 9999 );
    window.location.reload();
  }

  getUserToken() {
    return this.state.usertoken;
  }

  //loginElement = (
  //  <LoginDlg color="inherit" usertoken={ this.state.usertoken } clearToken={ this.clearToken.bind(this) } updateToken={ this.updateToken.bind(this) } />
  //);

  render() {
    const { classes } = this.props;
    let theme =this.util.getCookie( "theme");

    if( theme === "" )
      theme = "dark";
 
    return (
      <div className={classes.root}>
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
                <Link color="textPrimary" component={RouterLink} to="/">
                  Home
                </Link>
              </ListItem>
              <ListItem button >
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <Link color="textPrimary" component={ RouterLink } to="/blog">
                  Blog
                </Link>
              </ListItem>
              <ListItem button>
                <ListItemIcon><BookmarksIcon /></ListItemIcon>
                <Link color="textPrimary" component={ RouterLink } to="/bookmarks">
                  Bookmarks
                </Link>
              </ListItem>
              <ListItem button>
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <Link color="textPrimary" component={ RouterLink } to="/settings">
                  Settings
                </Link>
              </ListItem>
            </List>
          </Drawer>

          <main className={classes.content}>
            <div className={classes.toolbar} />

            <Route path="/" exact render={ (props) => < HomePanel {...props} 
                    clearToken={ this.clearToken.bind(this) } updateToken={ this.updateToken.bind(this)}/> }/>
            <Route path="/blog" render={ (props) => < BlogPanel {...props} 
                    clearToken={ this.clearToken.bind(this) } updateToken={ this.updateToken.bind(this)}/> }/>
            <Route path="/bookmarks" render={ (props) => < BookmarksPanel {...props} 
                    clearToken={ this.clearToken.bind(this) } updateToken={ this.updateToken.bind(this)} /> }/>
            <Route path="/settings" render={ (props) => < SettingsPanel {...props} 
                    mytheme={ theme } setTheme={ this.setTheme.bind(this)} clearToken={ this.clearToken.bind(this) } updateToken={ this.updateToken.bind(this)} /> }/>
          </main>
      </div>
    )
  }
}

export default withTheme(withStyles(useStyles)( App ));
