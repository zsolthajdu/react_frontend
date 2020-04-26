import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip'
import Link from '@material-ui/core/Link';


// https://material-ui.com/guides/typescript/
// https://material-ui.com/system/typography/
// https://material-ui.com/components/tooltips/


/**
 * Customized tooltip 
 */
const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    color: "text.primary",
    backgroundColor: "text.primary",
    fontSize: theme.typography.pxToRem(14)
  }
}))(Tooltip);


interface OwnProps {
  tooltip : String
  url : string
  title : String
  creation : string
  id : number
}


const BookmarkListEntry = (props : OwnProps ) => {

  const created = new Date( props.creation )
  const bminfo = "\n\nCreated:" + created.toLocaleDateString() + ' : ' + created.toLocaleTimeString() + "    Id : " + String(props.id)

  return (
    <CustomTooltip title = { 
      <React.Fragment>
        <p>{props.tooltip }</p> {bminfo}
      </React.Fragment>
    }>
      <Link href={ props.url } color="textPrimary" >{ props.title}  </Link>
    </CustomTooltip>
  )

}


export default  BookmarkListEntry as React.ComponentType<OwnProps>;
