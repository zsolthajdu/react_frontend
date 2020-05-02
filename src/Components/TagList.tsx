import React from 'react';
import { createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

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

interface TagEntry {
  id: Number
  name: string
}

interface ChipProps extends WithStyles<typeof styles>  {
  adat : TagEntry[];
  tagSearch( tag: string ): void ;
}

class ChipList extends React.Component <ChipProps, {} > {

  /**
   * More on typescript event handling:
   * https://fettblog.eu/typescript-react/events/
   */
  chipClick = ( label : string ) => {
    console.log( "Getting bookmarks with label '" + label + "'");
    this.props.tagSearch( label )
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
      { this.props.adat.map( ( label ) => 
         <Chip size="small" key={label.name } clickable={true} label={ label.name } onClick={ () => this.chipClick(label.name) } className={classes.chip}/> 
      )}
      </div>
    )
  }
}

export default withStyles(styles)(ChipList);
