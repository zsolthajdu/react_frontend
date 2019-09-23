import React, { Component, MouseEvent } from 'react';

import Select from '@material-ui/core/Select';
import { Theme, createStyles, WithStyles  } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

const useStyles = ( {spacing, palette} : Theme) => createStyles({
  root: {
    color: 'white',
  },
  button: {
    display: 'block',
    marginTop: spacing(2),
  },
  formControl: {
    margin: spacing(1),
    minWidth: 80,
  },

});

interface SelProps extends WithStyles<typeof useStyles> {
  value : number,
  values : SelItem[];
  title: string;
  handleChange( val: number ): void ;
};

interface SelState {
  val : number;
};

export interface SelItem {
  val: number;
  name: string;
};


class ComboSelection extends  React.Component <SelProps, {} > { 
  state : SelState = { val : 25 }

  constructor( props: SelProps ) {
    super( props );
    this.state.val = props.value;
  }

  handleChange = (event: React.ChangeEvent<{ value: unknown }>) =>  {
    this.setState( {val: event.target.value as number } );
    this.props.handleChange( event.target.value as number );
  }

  render() {
    const { classes } = this.props;

    return ( 
      <form autoComplete="off">
        <FormControl className={classes.formControl} >
          <InputLabel color='primary'  classes={{ root: classes.root } } htmlFor="combo-select">Size</InputLabel>
          <Select  value={ this.state.val }
                onChange={ this.handleChange }
                classes={{ root: classes.root } }
                inputProps={{ name: this.props.title, id: 'combo-select', } }
              >

            { this.props.values.map( ( { val, name }) => 
                <MenuItem value={val}>{name}</MenuItem>
            )}
          </Select>
        </FormControl>
      </form>
    )
  }

};

export default withStyles(useStyles)( ComboSelection );
