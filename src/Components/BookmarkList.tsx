import React, { Component, MouseEvent } from 'react';
import { IconButton, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Theme, WithStyles, createStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import { Edit, Delete } from '@material-ui/icons'
import ChipList from './TagList'

const styles =  ( { spacing }: Theme ) => createStyles({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  link: {
    margin: spacing(1),
  },
});

/**
 * Describes the info about a particular bookmarks.
 * BookmarkList gets an array of these in the input property.
 */
interface BookmarkRecord {
  id: number;
  title : string;
  url: string;
  created: Date;
  description: string;
  tags : string[];
}

interface BmListProps extends WithStyles<typeof styles>  {
  // Details in the interface above
  bookmarks : BookmarkRecord[];

  // Callback to parent to search for bookmarks with a specific label
  tagSearch( val: string ): void ;
};

class BookmarkList extends Component< BmListProps, {} > {

  onDelete(id: number, e:MouseEvent ) {

  }

  onSelectEdit( id: number, e:MouseEvent ) {
    console.log( "edit-select: " + id );
  }

  openUrl( link:any ) {
    window.open( link.url );
  }

  render() {
    const { classes } = this.props;
    //creation = new Date( entry['created'])
    //$titleText = entry['description' ] + "\n\nCreated : " + creation.toLocaleDateString() + " : " + creation.toLocaleTimeString() + '       ID:' + entry['id']

    return (
      <div>
        { this.props.bookmarks.map(({ id, title, url, created, description, tags }) =>
            <Grid container spacing={2} >
              <Grid item xs={6} >
                <Tooltip title={description} placement="bottom-start">
                  <Typography>  
                    <Link href={ url } color="textPrimary" className={classes.link}>{title}  </Link>
                  </Typography>
                </Tooltip>
              </Grid>
              <Grid item xs={5} >
                  <ChipList adat={tags} tagSearch={this.props.tagSearch}/>
              </Grid>
              <Grid item xs={1} >
                <IconButton color='primary'  onClick={(e) => this.onSelectEdit(id,e) }  >
                  <Edit />
                </IconButton>
                <IconButton color='primary'  onClick={(e) => this.onDelete(id,e) }  >
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
        )}
      </div>
    )
  }
}
export default withStyles(styles)(BookmarkList);