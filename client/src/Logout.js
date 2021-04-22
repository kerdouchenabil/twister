import React from 'react'
import Button from '@material-ui/core/Button';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import IconButton from '@material-ui/core/IconButton';

import axios from 'axios';
class Logout extends React.Component {
  handleSubmit = (event) =>{
        
    event.preventDefault();
    const api = axios.create({
        baseURL : '/api/',
        timeout : 1000,
        headers : {'X-Custom-Header' : 'foobar'}
        });
    api.delete('/user/logout') 
    .then(response => {
        //console.log(response.data); // à tester la première fois pour voir ce que retourne le serveur
        //this.props.login(response.data["status_key"])
        if(response.status == 201 ){
          this.props.logout()
          alert("déconnexion réussie")
        }
    });

  }
  render() {
    return <label htmlFor="icon-button-file">
             <IconButton color="secondary" aria-label="Menu" component="span" onClick={this.handleSubmit}>
              <ExitToAppSharpIcon style={{ fontSize: 50 }}/>
             </IconButton>
            </label>
    
  }
}

export default Logout;
