import React from 'react'

//import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
//import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
//import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
//import Typography from '@material-ui/core/Typography';
//import { makeStyles } from '@material-ui/core/styles';
//import Container from '@material-ui/core/Container';
//import { palette } from '@material-ui/system';

import axios from 'axios';
class SignUp extends React.Component {
  state = {

    login : '',
    password : '',
    lastname : '',
    firstname : '',
    data:{}
  }
  changeLogin = event => {
    const val = event.currentTarget.value;
    const val1 = event.currentTarget.type
    this.setState({login : val})
  }
  changePassword = event => {
    const val = event.currentTarget.value;
    this.setState({password : val})
  }
  changeLastname = event => {
    const val = event.currentTarget.value;
    this.setState({lastname : val})
  }
  changeFirstname = event => {
    const val = event.currentTarget.value;
    this.setState({firstname : val})
  }

  handleSubmit = (event) =>{
        
    event.preventDefault();
    const api = axios.create({
        baseURL : '/api/',
        timeout : 1000,
        headers : {'X-Custom-Header' : 'foobar'}
        });
    api.post('/user/',{"login": this.state.login,"password" : this.state.password,"lastname" : this.state.lastname,"firstname" : this.state.firstname},) 
      .then(response => {
        console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        if(response.status == 201){
          console.log(response);
          this.props.logout();
          alert("compte crée avec succés !")
        }

       });

  }
    render() {
/*
        const { login } = this.props;

        return <div className="SignUpform">
       <h2>Sign Up</h2>
        <main>
            <section>
                <section>
                    <div>
                        <label>Prénom</label>
                        <input type="text"/>
                    </div> 
                    <div>   
                        <label>Nom</label>
                        <input type="text"/>

                    </div>
                    </section>
                    <section>
                    <div>
                        <label>Login</label>
                        <input type="text"/>
                    </div> 
                    <div>   
                        <label>Password</label>
                        <input type="password"/>

                    </div>
                    <div>   
                        <label>Password again</label>
                        <input type="password"/>

                    </div>
                    </section>
                    
                    <button onClick={() => { login(); }}>Créer un compte</button>
                    
            </section>
        </main>
             
      </div>;
*/
      //////////////////////////////// material ui
      const { signup, logout } = this.props;
        
        return <div className="SignUpform" >
            
        <h2 color='secondary'>Sign Up</h2>


        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                value={this.state.firstname}
                onChange={this.changeFirstname}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                value={this.state.lastname}
                onChange={this.changeLastname}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={this.state.login}
                onChange={this.changeLogin}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={this.state.password}
                onChange={this.changePassword}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <p>____________________________________________________________________________</p>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick= { this.handleSubmit  } ///
          >
            Sign Up
          </Button>
          
              <p>
                <br></br><br></br>
                Vous avez déjà un compte ?
              </p>
            <Button
          
            
            variant="contained"
            color="primary"
            onClick={() => { logout(); }} ///
          >
            Sign in
          </Button>
            
        </form>



        </div>;

    }
  }
  
  export default SignUp;












