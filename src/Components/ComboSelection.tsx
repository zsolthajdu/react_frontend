import React from 'react';

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

export interface SelItem {
  val: number;
  name: string;
};

class ComboSelection extends  React.Component <SelProps, {} > { 

  handleChange = (event: React.ChangeEvent<{ value: unknown }>) =>  {
    this.props.handleChange( event.target.value as number );
  }

  render() {
    const { classes } = this.props;

    return ( 
      <form autoComplete="off">
        <FormControl className={classes.formControl} >
          <InputLabel color='primary' htmlFor="combo-select">Size</InputLabel>
          <Select  value={ this.props.value }
                onChange={ this.handleChange }
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
