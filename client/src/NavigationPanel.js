import React from 'react'
import Login from './Login'
import Logout from './Logout'
import Button from '@material-ui/core/Button';
import Message from './components/Message';

import Box from '@material-ui/core/Box';



class NavigationPanel extends React.Component {
/*
  constructor(props){
    super(props);
    //
  }
*/
  render() {
    const { login, logout, signup, isConnected } = this.props;

    const props = {"title":"titre du post", "avatar":"Z", "date":Date.now(), "media":"media", "image_file":"image file", "image_title":"img title", "message":"voici mon message post !"}

    
    return <nav id="navPanel">
      { !isConnected && <Login login={login} />}
      
      { isConnected && <Logout logout={logout} />}

      <Box width="1" bgcolor="grey.300" p={1} my={0.5}>

      { isConnected && <Message props = {JSON.stringify({"title":"titre du post", "avatar":"Z", "date":Date.now(), "media":"media", "image_file":"image file", "image_title":"img title", "message":"voici mon message post !"})} /> }
      { isConnected && <Message props = {JSON.stringify({"title":"titre du post", "avatar":"Z", "date":Date.now(), "media":"media", "image_file":"image file", "image_title":"img title", "message":"voici mon message post !"})} /> }
      { isConnected && <Message props = {JSON.stringify({"title":"titre du post", "avatar":"Z", "date":Date.now(), "media":"media", "image_file":"image file", "image_title":"img title", "message":"voici mon message post !"})} /> }

      </Box>

             
      {!isConnected && <p>
        Vous n'avez pas encore de compte ?
        <Button variant="contained" color="primary" onClick={() => { signup(); }}>S'inscrire</Button>
      </p>}
    </nav>;
  }
}

export default NavigationPanel;
