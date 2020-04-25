import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip'
import Link from '@material-ui/core/Link';


// https://material-ui.com/guides/typescript/
// https://material-ui.com/system/typography/
// https://material-ui.com/components/tooltips/

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
}


const BookmarkListEntry = (props : OwnProps ) => {


  return (
    <CustomTooltip title = { props.tooltip } >
      <Link href={ props.url } color="textPrimary" >{ props.title}  </Link>
    </CustomTooltip>
  )

}


export default  BookmarkListEntry as React.ComponentType<OwnProps>;
