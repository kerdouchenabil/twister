import React from 'react'
//import Button from '@material-ui/core/Button';
//import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
//import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
//import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import './css/MainPage.css';
import axios from 'axios';
class Login extends React.Component {
  state = {

    login : '',
    password : '',
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

  handleSubmit = (event) =>{
    
    event.preventDefault();
    const api = axios.create({
        baseURL : '/api/',
        timeout : 1000,
        headers : {'X-Custom-Header' : 'foobar'}
        });
    api.post('/user/login',{"login": this.state.login,"password" : this.state.password},) 
    .then(response => {
        //console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        if(response.data.status == 200){
          this.props.login()
        }
    }).catch( response => {
      //console.log(response); // à tester la première fois pour voir ce que retourne le serveur

        alert("email/password incorrect !")

        
    });

  }
  render() {
    const { login } = this.props;

    return <div className="LoginForm">
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div >
        
        <Typography component="h2" variant="h5" >
          Sign in
        </Typography>
        <form noValidate >
          <TextField
          inputProps={{
            style: {
              padding: 20
            }
         }}
            value={this.state.login}
            onChange={this.changeLogin}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={this.state.password}
            onChange={this.changePassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick= {this.handleSubmit }
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
        
      
    </div>;
  }
}

export default Login;
