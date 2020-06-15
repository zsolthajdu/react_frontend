import React, { useState }  from 'react'
import { makeStyles} from '@material-ui/core/styles';
import {
  Fab, TextField, Button,
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions';
import { Add } from '@material-ui/icons'
import Bookmarks from '../Server/Bookmarks'
import Django from '../Server/Django'
import PageInfoApp from '../Server/PageInfo'

const useStyles = makeStyles((theme) => ({

  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),  
  },
}));


interface addProps {
  refresh() : void;
};

interface urlInfoResult {
  url: string
  title: string
  description : string
  tags: string
}

const BookmarkAdd = ( props : addProps ) => {

  const classes = useStyles();
  const [ open, setOpen ] = useState( false )
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const [tags, setTags] = useState('')
 	const [description, setDescription] = useState('')	
  const handleClose = () => {
    setOpen(false);
  };

  interface tagsEntry {
    name : string
  }

  const addBookmark = () => {
    console.log( "addBookmark Title= " + title )
    console.log( "addBookmark Url  = " + url )

    // Convert comma separated tags to array
    let tgs : tagsEntry[] = []
    tags.split(",").forEach( t => {
      tgs.push( { "name": t } )
    })
    //console.log( "addBookmark Tags = " + tgs.toString() )

    const e = {
      id: "-1",
      url: url,
      title: title,
      desc: description,
      public: false,
      tags: tgs
    };

    let django = new Django()
    let bm = new Bookmarks(django)

    bm.add( e ).then( () => {
      props.refresh()
      handleClose()
    })
  
  }

  // 
  const urlInfo = () => {
    let dj = new Django();
    const pi = new PageInfoApp( dj )
    pi.getPageInfo( url ).then( (pageInfo : urlInfoResult ) => {
      console.log( pageInfo )
      setTitle( pageInfo.title )
      setDescription( pageInfo.description )
      setTags( pageInfo.tags )
    })
  }

  return(
    <div>
      <Fab
        onClick={ () => setOpen( true )}
        color='secondary'
        size='small'
        className={classes.fab}
      >
        <Add />
      </Fab>

      <MuiDialog
          open={open}
          onClose={ () => setOpen( false )}
          fullWidth
          maxWidth='lg'
        >
          <DialogTitle>Create a New Bookmark</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out the form below.
            </DialogContentText>

            <form >
              <TextField label='URL' name='url' onChange={ (e) => setUrl(e.target.value) } value={url} onBlur = { () => urlInfo() }  margin='normal' fullWidth />
					    <TextField label='Title'  name='title' onChange={ (e) => setTitle(e.target.value) } value = {title }  margin='normal' fullWidth />
              <TextField label='Description' name='desc' onChange={ (e) => setDescription(e.target.value) } value={description} multiline margin='normal' fullWidth />
					    <TextField label='Tags' name='tags' onChange={ (e) => setTags(e.target.value) } value={tags} margin='normal' fullWidth />

              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={addBookmark} color="primary">
                  Add
                </Button>
              </DialogActions>
    
            </form>

          </DialogContent>
        </MuiDialog>

    </div>
  )
}

export default  BookmarkAdd
