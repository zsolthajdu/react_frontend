import React, { Component } from 'react';
import { createStyles, fade, Theme, WithStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import BookmarkList from './Components/BookmarkList';
import Django from './Server/Django'
import Bookmarks from './Server/Bookmarks'
import ComboSelection from './Components/ComboSelection';
import LoginDlg from './Components/LoginDlg';
import { SelItem } from './Components/ComboSelection';

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
  //handleChange( val: number ): void ;
  clearToken() : void;
  updateToken() : void;
};


class BookmarksPanel extends Component< bmProps, {} > {

  state = {
    bookmarks : [],
    searchWord: "",  // store as cookie
    searchTag: "",  // store as cookie
    pageSize: 50,  // store as cookie
    currentPage: 1, 
  };

  pagesizes: SelItem[] = [
    { val:10, name:"10" },
    { val:25, name:"25" },
    { val:50, name:"50" },
  ];

  componentDidMount() {
    this.getBookmarks();
  }

  handlePageSizeChange = ( newLen : number ) => {
    console.log( "handlePageSizeChange : switching to page-size " + newLen )
    this.setState( { pageSize: newLen });
    this.getBookmarks( newLen );
  }

  getBookmarks( pageLen? : number ) {
    let django = new Django();
    let bm = new Bookmarks(django);

    if( this.props.usertoken !== "" ) {
      bm.getBookmarks( pageLen !== undefined ? pageLen : this.state.pageSize ).then(
        (response) => {
          let bms = response.results;
          this.setState({  bookmarks: bms })
        }
      )
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

  tagSearch( tag: string ) {
    let django = new Django();
    let bm = new Bookmarks( django );

    if( this.props.usertoken !== "" ) {
      console.log( 'tagSearch : for ' + tag );
      bm.search( tag, 1, this.state.pageSize.toString() ).then(
        (response) => {
          let bms = response.results;
          this.setState( { bookmarks:bms, searchWord:tag} );
        }
      )
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div >
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap className={classes.title }>
              Bookmarks
            </Typography>

            <Typography classes={{ root: classes.filterRoot }} >
              Filter: { this.state.searchWord }
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

      </div>
    )
  }
}

export default withStyles(useStyles)( BookmarksPanel );
//             <LoginDlg color="inherit" usertoken={ this.props.usertoken } clearToken={ this.clearToken.bind(this) } updateToken={ this.updateToken.bind(this) }/>
