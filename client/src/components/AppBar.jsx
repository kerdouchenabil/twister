import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import DehazeTwoToneIcon from '@material-ui/icons/DehazeTwoTone';
import SupervisorAccountSharpIcon from '@material-ui/icons/SupervisorAccountSharp';
import Avatar from '@material-ui/core/Avatar';


import ListFriends from "./ListFriends"

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

  const { show_messages, show_friends, show_post_message } = props;


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
          <DehazeTwoToneIcon style={{ fontSize: 50 }}/>
        </IconButton>
      </label>
      {/*
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Open Menu
      </Button>
      */}


      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      > 
        <StyledMenuItem onClick={() => { alert("Profil !"); }}>
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

        <StyledMenuItem onClick={() => {show_messages()}}>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Actualité" />
        </StyledMenuItem >

        <StyledMenuItem onClick={() =>  {show_friends()} }>
          <ListItemIcon>
            <SupervisorAccountSharpIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Friends" />
        </StyledMenuItem>

      </StyledMenu>
    </div>
  );
}