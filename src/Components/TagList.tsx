import React, { MouseEvent } from 'react';
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


interface ChipProps extends WithStyles<typeof styles>  {
  adat : string[];
  tagSearch( tag: string ): void ;
}

interface ChipDesc {
  key: number;
  label : string;
}

interface ChipState {
  chipData : ChipDesc[];
}

class ChipList extends React.Component <ChipProps, {} > {
  state : ChipState = {
    chipData: []
  };

  constructor( props: ChipProps ) {
    super(props)
    let i : number = 0;

    for( i=0 ; i< props.adat.length ; i++ ) {
      this.state.chipData[i] = { key:i , label: props.adat[i] };
    }
  }

  /**
   * More on typescript event handling:
   * https://fettblog.eu/typescript-react/events/
   */
  chipClick = ( label : string , e:MouseEvent ) => {
    console.log( "Getting bookmarks with label '" + label + "'");
    this.props.tagSearch( label )
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
      { this.state.chipData.map( ( { key, label }) => 
         <Chip key={key} size="small" clickable={true} label={ label } onClick={ (e) => this.chipClick(label, e) } className={classes.chip}/> 
      )}
      </div>
    )
  }
}

export default withStyles(styles)(ChipList);
