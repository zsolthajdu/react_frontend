
import React, { MouseEvent } from 'react';
import { createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip'
import Link from '@material-ui/core/Link';
import { PinDropSharp } from '@material-ui/icons';

// https://material-ui.com/guides/typescript/

const styles = ({ spacing }: Theme) => createStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  grow: {
    flexGrow: 1,
  },  
  chip: {
    margin: spacing(1),
  },
});

interface OwnProps {
  tooltip : String
  url : string
  title : String
}


const BookmarkListEntry : React.FC< OwnProps> = (props) => {

  return (
    <Tooltip title = { props.tooltip } >
      <Link href={ props.url } color="textPrimary" >{ props.title}  </Link>
    </Tooltip>
  )

}


export default BookmarkListEntry as React.ComponentType<OwnProps>;
