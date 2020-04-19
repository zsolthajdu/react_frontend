import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withTheme } from '@material-ui/styles';
import { createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { Route, Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import HomeIcon from '@material-ui/icons/Home';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import SettingsIcon from '@material-ui/icons/Settings';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Util from './Server/Util'
import BookmarksPanel from './Components/BookmarksPanel'
import HomePanel from './Components/HomePanel'
import BlogPanel from './Components/BlogPanel'
import SettingsPanel from './Components/SettingsPanel'
import LoginDlg from './Components/LoginDlg';
import { useStyles } from './styles';

const classNames = require('classnames');
const drawerWidth = 240;

interface AppProps extends WithStyles<typeof useStyles> {
  theme : Theme,
};

class App extends Component< AppProps, {} > {
  util : Util;

  constructor( props: AppProps ) {
    super( props );
    this.util = new Util();
  }

  state = {
    usertoken: "",
    draweropen: true,
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
    if( t !== null && t !== "" ) {
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

  handleDrawerOpen = () => {
    this.setState( {draweropen: true } );
  };

  handleDrawerClose = () => {
    this.setState( {draweropen: false } );
  };

  renderAppBar() {
    const { classes } = this.props;
    return (
      <AppBar position="fixed" 
            className={clsx(classes.appBar, { [classes.appBarShift]: this.state.draweropen,
      })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={ this.handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, { [classes.hide]: this.state.draweropen, })}
          >
            <MenuIcon />
          </IconButton>          
          <Typography variant="h6" noWrap  className={classes.title }>
            Algoretum
          </Typography>
          <LoginDlg color="inherit" clearToken={ this.clearToken } updateToken={ this.updateToken } />
        </Toolbar>
      </AppBar>
    )
  }

  renderDrawer() {
    const { classes, theme } = this.props;

    const routes = [
      { path: '/' , title: "Home", icon: () => <HomeIcon /> },
      { path: '/blog' , title: "Blog", icon: () => <InboxIcon /> },
      { path: '/bookmarks' , title: "Bookmarks", icon: () => <BookmarksIcon /> },
      { path: '/settings' , title: "Settings", icon: () => <SettingsIcon /> }
    ]

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !this.state.draweropen && classes.drawerPaperClose),
        }}
        open={ this.state.draweropen }
      >
        <div className={classes.toolbar} >
          <IconButton onClick={ this.handleDrawerClose}>
            { theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon /> }
          </IconButton>
        </div>

        <Divider />
        { routes.map((route, index) => {
          return (
              <RouterLink color="primary" key={index} className={classes.link} to={route.path} >
                  <ListItem  button={true}>
                      <ListItemIcon>
                          {route.icon()}
                      </ListItemIcon>
                      <ListItemText  style={{ textDecoration: 'none' }} primary={route.title} />
                  </ListItem>
              </RouterLink>
          );
        })}
        <Divider />

      </Drawer>
    )
  }

  render() {
    const { classes } = this.props;
    let theme = this.util.getCookie( "theme");

    if( theme === "" )
      theme = "dark";
 
    return (
      <div className={classes.root}>

        { this.renderAppBar() }
        { this.renderDrawer() }

        <main className={classes.content} >

            <div className={classes.toolbar} />

            <Route path="/" exact render={ (props) => < HomePanel {...props} 
                    clearToken={ this.clearToken.bind(this) } updateToken={ this.updateToken.bind(this)}/> }/>
            <Route path="/blog" render={ (props) => < BlogPanel {...props} 
                    clearToken={ this.clearToken.bind(this) } updateToken={ this.updateToken.bind(this)}/> }/>
            <Route path="/bookmarks" render={ (props) => < BookmarksPanel {...props} 
                    clearToken={ this.clearToken.bind(this) } updateToken={ this.updateToken.bind(this)} draweropen={ this.state.draweropen } /> }/>
            <Route path="/settings" render={ (props) => < SettingsPanel {...props} 
                    mytheme={ theme } setTheme={ this.setTheme.bind(this)} clearToken={ this.clearToken.bind(this) } updateToken={ this.updateToken.bind(this)} /> }/>
        </main>
      </div>  
    )
  }
}

export default withTheme(withStyles(useStyles as any )( App as any));
