import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

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