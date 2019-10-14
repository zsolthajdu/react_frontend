
import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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
  clearToken() : void;
  updateToken() : void;
};

class HomePanel extends Component< HomeProps, {} > {

  render() {
    return(
      <div >
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
