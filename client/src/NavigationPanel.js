import React from 'react'
import Login from './Login'
import Logout from './Logout'
import Button from '@material-ui/core/Button';
import Message from './components/Message';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';


import AppBar from './components/AppBar'
import Test from './components/Test'

import './css/MainPage.css';


class NavigationPanel extends React.Component {
/*
  constructor(props){
    super(props);
    //
  }
*/
  render() {
    const { login, logout, signup, isConnected } = this.props;

    
    return <div>
      { !isConnected && <Login login={login} />}

      {isConnected &&
      

        <div>
        <div className="header_container">
          <div>
          { isConnected && <AppBar />}
          </div>
          <div>
          <Logout logout={logout} />
          </div>
        </div>

        </div>



      }


      

      <div width="100" p={1} my={0.5}>
      
      { isConnected && <Message props = {JSON.stringify({"title":"titre du post", "avatar":"Z", "date":Date.now(), "media":"media", "image_file":"image file", "image_title":"img title", "message":"voici mon message post !"})} /> }
      { isConnected && <Message props = {JSON.stringify({"title":"titre du post", "avatar":"Z", "date":Date.now(), "media":"media", "image_file":"image file", "image_title":"img title", "message":"voici mon message post !"})} /> }
      { isConnected && <Message props = {JSON.stringify({"title":"titre du post", "avatar":"Z", "date":Date.now(), "media":"media", "image_file":"image file", "image_title":"img title", "message":"voici mon message post !"})} /> }

      </div>

             
      {!isConnected && <p>
        Vous n'avez pas encore de compte ?
        <Button variant="contained" color="primary" onClick={() => { signup(); }}>S'inscrire</Button>
      </p>}
    </div>;
  }
}

export default NavigationPanel;
