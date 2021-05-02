import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import DehazeTwoToneIcon from '@material-ui/icons/DehazeTwoTone';
import SupervisorAccountSharpIcon from '@material-ui/icons/SupervisorAccountSharp';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',

  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus(props) {

  const { show_profil, show_messages, show_friends, show_post_message, search } = props;


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="Menu" component="span" onClick={handleClick}>
          <DehazeTwoToneIcon style={{ fontSize: 50 }} />
        </IconButton>
      </label>


      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={() => { show_profil() }}>
          <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profil" />
        </StyledMenuItem>

        <StyledMenuItem onClick={() => { show_post_message() }}>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Post" />
        </StyledMenuItem>

        <StyledMenuItem onClick={() => { show_messages() }}>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Actualité" />
        </StyledMenuItem >

        <StyledMenuItem onClick={() => { show_friends() }}>
          <ListItemIcon>
            <SupervisorAccountSharpIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Friends" />
        </StyledMenuItem>

      </StyledMenu>
    </div>
  );
}