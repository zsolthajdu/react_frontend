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


const useStyles = makeStyles((theme) => ({

  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),  
  },
}));


const BookmarkAdd = () => {

  const classes = useStyles();
  const [ open, setOpen ] = useState( false )
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const [tags, setTags] = useState('')
 	const [description, setDescription] = useState('')	
  const handleClose = () => {
    setOpen(false);
  };

  const addBookmark = () => {
    //event.preventDefault()
    console.log( "addBookmark Title=" + title )
    console.log( "addBookmark Url  =" + url )
    console.log( "addBookmark Tags =" + tags )

	 //Bookmarks.add( {} )

    handleClose()
  }
 
  	const handleUrlChange = (event:  React.ChangeEvent< HTMLInputElement>) => {
		setUrl( event.target.value )
	}

  	const handleTitleChange = (event:  React.ChangeEvent< HTMLInputElement>) => {
		setTitle( event.target.value )
	}

  	const handleDescriptionChange = (event:  React.ChangeEvent< HTMLInputElement>) => {
		setDescription( event.target.value )
	}

  	const handleTagsChange = (event:  React.ChangeEvent< HTMLInputElement>) => {
		setTags( event.target.value )
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

            <form onSubmit={addBookmark}>
              <TextField label='URL' name='url' onChange={handleUrlChange} margin='normal' fullWidth />
					    <TextField label='Title'  name='title' onChange={handleTitleChange}  margin='normal' fullWidth />
              <TextField label='Description' name='desc' onChange={ (e) => setDescription(e.target.value) } multiline margin='normal' fullWidth />
					    <TextField label='Tags' name='tags' onChange={ (e) => setTags(e.target.value) } margin='normal' fullWidth />

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
