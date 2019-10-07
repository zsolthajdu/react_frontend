import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import LoginDlg from './LoginDlg';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

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
  formControl: {
    margin: theme.spacing(3),
  },
});

interface SettingProps extends WithStyles<typeof useStyles> {
  mytheme: string;
  setTheme( nt: string ) : void;
  clearToken() : void;
  updateToken() : void;
};

class SettingsPanel extends Component< SettingProps, {} > {

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setTheme( (event.target as HTMLInputElement).value );
  }; 

  render() {
    const { classes } = this.props;
    return(
      <div >
        <AppBar position="fixed" color="inherit" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap  className={classes.title }>
              Profile Settings
            </Typography>
            <LoginDlg color="inherit" clearToken={ this.props.clearToken } updateToken={ this.props.updateToken } />
          </Toolbar>
        </AppBar>

        <FormControl component="fieldset" className={classes.formControl}  >
          <FormLabel component="legend">Theme</FormLabel>
          <RadioGroup aria-label="theme" name="theme1" value={this.props.mytheme} onChange={ this.handleChange }  >
            <FormControlLabel value="light" control={<Radio />} label="Light" />
            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
    
          </RadioGroup>
        </FormControl>

      </div>      
    )
  }
}

export default withStyles(useStyles)( SettingsPanel);
