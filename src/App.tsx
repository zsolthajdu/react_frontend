import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withTheme } from '@material-ui/styles';
import { createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Route, Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
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
import BookmarksPanel from './BookmarksPanel'
import HomePanel from './Components/HomePanel'
import BlogPanel from './Components/BlogPanel'
import SettingsPanel from './Components/SettingsPanel'
import LoginDlg from './Components/LoginDlg';

const drawerWidth = 240;

  const useStyles =( {spacing, palette,mixins,transitions} : Theme) => createStyles({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: transitions.create(['margin', 'width'], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: transitions.create(['margin', 'width'], {
      easing: transitions.easing.easeOut,
      duration: transitions.duration.enteringScreen,
    }),
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
  menuButton: {
    marginRight: spacing(2),
  },
  hide: {
    display: 'none',
  },  
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: spacing(0, 1),
    ...mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: spacing(3),
    transition: transitions.create('margin', {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: transitions.create('margin', {
      easing: transitions.easing.easeOut,
      duration: transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },  
});

interface AppProps extends WithStyles<typeof useStyles> {
};

class App extends Component< AppProps, {} > {
  util : Util = new Util();

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
      <AppBar position="fixed" color="inherit"     
            className={clsx(classes.appBar, { [classes.appBarShift]: this.state.draweropen,
      })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={ this.handleDrawerOpen}
            edge="start"
            className={ clsx(classes.menuButton, this.state.draweropen && classes.hide)}
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
    const { classes } = this.props;
    return (
      <Drawer
      className={classes.drawer}
      variant="persistent"
      open={ this.state.draweropen }
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.drawerHeader}>
          <IconButton onClick={ this.handleDrawerClose}>
            { <ChevronLeftIcon />  /*this.props.theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon /> */ }
          </IconButton>
        </div>
              
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
    )
  }

  render() {
    const { classes } = this.props;
    let theme =this.util.getCookie( "theme");

    if( theme === "" )
      theme = "dark";
 
    return (
      <div className={classes.root}>
          <CssBaseline />

          { this.renderAppBar() }
          { this.renderDrawer() }

        <main className={clsx(classes.content, {
              [classes.contentShift]: this.state.draweropen,
          })}>

            <div className={classes.drawerHeader} />

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

export default withTheme(withStyles(useStyles)( App ));
