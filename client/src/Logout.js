import React from 'react'
import Button from '@material-ui/core/Button';

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
    return <Button variant="contained" color='secondary' onClick={this.handleSubmit}>Se déconnecter</Button>
  }
}

export default Logout;
