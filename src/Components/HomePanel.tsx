
import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import { createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LoginDlg from './LoginDlg';

const drawerWidth = 240;

const useStyles =( theme: Theme) => createStyles({
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


  },
});

interface HomeProps extends WithStyles<typeof useStyles> {
  usertoken : string,
  clearToken() : void;
  updateToken() : void;
};

class HomePanel extends Component< HomeProps, {} > {

  render() {
    const { classes } = this.props;

    return(
      <div >
        <AppBar position="fixed" color="inherit" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap  className={classes.title }>
              Home
            </Typography>
            <LoginDlg color="inherit" usertoken={ this.props.usertoken } clearToken={ this.props.clearToken } updateToken={ this.props.updateToken } />
          </Toolbar>
        </AppBar>

          <div>
          <Typography variant="h5" component="h3">
            Welcome visitor !
          </Typography>
          </div>
          <Typography component="p">
            Please log in to access the bookmarks database.
          </Typography>
      </div>      
    )
  }
}

export default withStyles(useStyles)( HomePanel );
