import React, { Component, Fragment } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@material-ui/core'
import { Checkbox } from '@material-ui/core'
import { FormControl, Input, InputLabel, FormControlLabel } from '@material-ui/core'
import { createStyles,  Theme, WithStyles } from '@material-ui/core/styles';
import Django from '../Server/Django'
import Util from '../Server/Util'
import { withStyles } from '@material-ui/core';

const styles = ( {spacing, palette } : Theme) => createStyles({

    root: {
      flexGrow: 1,
    },
    paper: {
      padding: spacing(2),
      textAlign: 'center',
      color: palette.text.secondary,
    },
    loginPaper: {
      padding: spacing(2),
      textAlign: 'right',
      color: palette.text.secondary,
    },
})


interface LoginProps extends WithStyles<typeof styles> {
  usertoken : string;
  color : string;
  clearToken() : void;
  updateToken() : void;
}

/**
 * Also Logout. Go figure !
 */
class LoginDlg  extends Component< LoginProps, {} >  {

  state = {
    open: false,
    username: '',
    password: '',
  }

  constructor(props : LoginProps ) {
    super(props)

    this.handleChange = this.handleChange.bind( this );
  }

  noToken() : boolean {
    return ( this.props.usertoken === "" || this.props.usertoken === null );
  }

  /**
   * Login / Logout click toggle. 
   *   If user clicks on LOGIN, it opens the login popup
   *   If user clicks logout, it clears the existing user token and that
   *  switches text back to LOGIN.
   */
  handleToggle = () => {
    if( !this.noToken() ) {
      this.props.clearToken();
      this.setState( { loggedIn: false } );
    }
    else if( !this.state.open ) {
      this.setState( { open: true } );
    }
  }

  /**
   * setToken
   *   Try to get user token from backend and save as cookie
   */
  setToken = () => {
    let django = new Django();

    django.getUserToken( this.state.username, this.state.password ).then( response => {
      if( null !== response && 'token' in response ) {
        let util = new Util();
        console.log( "Got the token " + response['token'] );
        util.setCookie( "usertoken", response['token'], 1 )

        this.props.updateToken();
      }
    })
    this.handleClose();
  }

  handleClose = () => { 
    this.setState({   open: false } ) 
  }

  handleChange(event: React.ChangeEvent< HTMLInputElement >) {
    this.setState( { [event.target.id] : event.target.value } );
  }
  
  render() {
    const { open } = this.state
    if( !this.noToken() )
       this.state.open = false;

    return <Fragment>
      <Button color="inherit" onClick={this.handleToggle}  >
        { this.noToken() ? 'LOGIN' : 'LOGOUT' }
      </Button>

      <Dialog
        open={open}
        onClose={this.handleClose}
        fullWidth
        maxWidth='xs'
      >
        <DialogTitle>
          User Login
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your username and password
          </DialogContentText>
          <form onSubmit = { this.setToken } >
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input id="username" name="username"  value={ this.state.username }
                  onChange = {this.handleChange } 
                  autoComplete="username" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password"
                    onChange={this.handleChange }
                    autoComplete="current-password" />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={ this.setToken }
            >
              Sign in
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  }
}

export default  withStyles( styles) (LoginDlg) 
