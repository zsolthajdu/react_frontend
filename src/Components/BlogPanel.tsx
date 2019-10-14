import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { createStyles, Theme, WithStyles } from '@material-ui/core/styles';
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

interface BlogProps extends WithStyles<typeof useStyles> {
  clearToken() : void;
  updateToken() : void;
};

class BlogPanel extends Component< BlogProps, {} > {

  render() {
    const { classes } = this.props;
    return(
      <div >
        <Typography >
          Blog coming soon ...
        </Typography>
      </div>      
    )
  }
}

export default withStyles(useStyles)( BlogPanel);
