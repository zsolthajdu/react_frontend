import React, { Component } from 'react';
import { createStyles, fade, Theme, WithStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import BookmarkList from './Components/BookmarkList';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import Django from './Server/Django'
import Bookmarks from './Server/Bookmarks'
import ComboSelection from './Components/ComboSelection';
import LoginDlg from './Components/LoginDlg';
import { SelItem } from './Components/ComboSelection';
import Util from './Server/Util';
import { number } from 'prop-types';

const drawerWidth = 240;

const useStyles =( {spacing, palette,mixins,shape,breakpoints,transitions} : Theme) => createStyles({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
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

  fab: {
    position: 'fixed',
    bottom: spacing(2),
    right: spacing(2),
  },

  stepper: {
    maxWidth: 400,
    flexGrow: 1,
    align: "center"    
  },

  search: {
    position: 'relative',
    borderRadius: shape.borderRadius,
    backgroundColor: fade(palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: 10,
    width: '100%',
    [breakpoints.up('sm')]: {
      marginLeft: spacing(1),
      width: 'auto',
    },
  },

  filterRoot: {
    marginRight: 10,
  },

  searchIcon: {
    width: spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: spacing(1, 1, 1, 7),
    transition: transitions.create('width'),
    width: '100%',
    [breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },  
});


interface bmProps extends WithStyles<typeof useStyles> {
  usertoken : string,
  clearToken() : void;
  updateToken() : void;
};


class BookmarksPanel extends Component< bmProps, {} > {

  state = {
    bookmarks : [],
    url_next : "",
    url_prev : "",
    searchWord: "",  // store as cookie
    searchTag: "",  // store as cookie
    pageSize : 50,  // stored as cookie
    currentPage: 1, 
  };

  pagesizes: SelItem[] = [
    { val:10, name:"10" },
    { val:25, name:"25" },
    { val:50, name:"50" },
  ];

  componentDidMount() {
    let u : Util = new Util;
    let ps = u.getCookie( "pagesize" )
    if( ps !== null ) {
      console.log( "Sound pagesize value : " + ps )
      this.setState( { "pageSize": Number( ps ) } );
      this.getBookmarks( Number(ps) );
    }
    else
      this.getBookmarks();
  }

  handlePageSizeChange = ( newLen : number ) => {
    console.log( "handlePageSizeChange : switching to page-size " + newLen )
    let u : Util = new Util;
    u.setCookie( "pagesize", String( newLen ) , 365 );
    this.setState( { pageSize: newLen });
    this.getBookmarks( newLen );
  }

  getBookmarks( pageLen? : number ) {
    let django = new Django();
    let bm = new Bookmarks(django);

    if( this.props.usertoken !== "" ) {
      if( this.state.searchTag !== "" )
        this.tagSearch();
      else
        bm.getBookmarks( pageLen !== undefined ? pageLen : this.state.pageSize ).then(
          (response) => {
            let bms = response.results;
            this.setState({  bookmarks: bms, url_prev: response.prev, url_next:response.next })
          }
        )
        .catch( ( err ) => {
          console.log( "getBookmarks Error: " + err );
        })
    }
    else
      this.clearBookmarks();
  }

  /**
   * 
   * @param nextPage 
   */
  getBmPage( nextPage: boolean) {
    let django = new Django();
    let bm = new Bookmarks(django);

    if( this.props.usertoken !== "" ) {
      let theUrl: string = (nextPage ? this.state.url_next : this.state.url_prev);

        bm.getBookmarksUrl( theUrl ).then(
          (response) => {
            let bms = response.results;
            this.setState({  bookmarks: bms, url_prev: response.prev, url_next:response.next })
          }
        )
        .catch( (err) => {
          console.log( "Couldn't get response to " + theUrl );
          console.log( "Error: " + err );
        })
    }
    else
      this.clearBookmarks();
  }

  clearBookmarks() {
    if( this.state.bookmarks !== [] )
      this.setState({  bookmarks: [] })
  }

  updateToken() {
    this.props.updateToken();
    this.getBookmarks();
  }

  /**
   * After logging out.
   */
  clearToken() {
    this.clearBookmarks();
    this.props.clearToken();
  }

  tagSearch( tag? : string ) {
    let django = new Django();
    let bm = new Bookmarks( django );

    if( this.props.usertoken !== "" ) {
      let t : string;
      t = (tag !== undefined ? tag : this.state.searchTag);
      console.log( 'tagSearch : for ' + t );
      bm.search( t, 1, this.state.pageSize.toString() ).then(
        (response) => {
          let bms = response.results;
          this.setState( { bookmarks:bms, searchTag:tag} );
        }
      )
    }
  }

  handleNext = () => {
    this.setState( { currentPage: this.state.currentPage+1 } );
    this.getBmPage( true );  // Move to next page of bookmarks
  };

  handleBack = () => {
    if( this.state.currentPage > 1 ) {
      this.setState( { currentPage: this.state.currentPage-1 } );
      this.getBmPage( false );
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div >
        <AppBar position="fixed" color="inherit" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap className={classes.title }>
              Bookmarks
            </Typography>

            <MobileStepper variant="dots" steps={5} position="static" 
                className = {classes.root }
              nextButton={
                <Button size="small" onClick={this.handleNext} disabled={ this.state.currentPage === 5}>
                  Next
                  { <KeyboardArrowRight/> /* theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight /> */}
                </Button>
              }
              backButton={
                <Button size="small" onClick={ this.handleBack } disabled={ this.state.currentPage === 0}>
                  { <KeyboardArrowLeft /> /* theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft /> */ }
                  Back
                </Button>
              }
            />


            <Typography classes={{ root: classes.filterRoot }} >
              Filter: { this.state.searchTag }
            </Typography>

            <ComboSelection value={ this.state.pageSize } values={this.pagesizes} title="Size" handleChange={ this.handlePageSizeChange } />

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>              
            <LoginDlg color="inherit" usertoken={ this.props.usertoken } clearToken={ this.clearToken.bind(this) } updateToken={ this.updateToken.bind(this) } />
          </Toolbar>
        </AppBar>

        <BookmarkList bookmarks = { this.state.bookmarks } tagSearch={this.tagSearch.bind(this)} />

          <Fab color="primary" aria-label="add" className={classes.fab}>
            <AddIcon />
          </Fab>

      </div>
    )
  }
}

export default withStyles(useStyles)( BookmarksPanel );
