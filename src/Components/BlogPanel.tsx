import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { useTheme , withTheme } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
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
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
});

interface HomeProps extends WithStyles<typeof useStyles> {
  usertoken : string,
  clearToken() : void;
  updateToken() : void;
};

class BlogPanel extends Component< HomeProps, {} > {

  render() {
    const { classes } = this.props;
    return(
      <div >
        <AppBar position="fixed" color="inherit" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap  className={classes.title }>
              Blog
            </Typography>
            <LoginDlg color="inherit" usertoken={ this.props.usertoken } clearToken={ this.props.clearToken } updateToken={ this.props.updateToken } />
          </Toolbar>
        </AppBar>

        <Typography >
          Blog coming soon ...
        </Typography>
      </div>      
    )
  }
}

//export default withTheme( BlogPanel );
export default withStyles(useStyles)( BlogPanel);

