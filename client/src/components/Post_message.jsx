import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextField from '@material-ui/core/TextField';
import '../css/MainPage.css';
import axios from 'axios';
/*
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
*/
let formData = new FormData();


class Post_message extends React.Component {
  state = {

    text : '',
    file : '',
    data:{}
  }  
  changeText = event => {
    const val = event.currentTarget.value;
    const val1 = event.currentTarget.type
    this.setState({text : val})
  }
  changeFile = event => {
    const val = event.currentTarget.value;
    this.setState({file : val})
    
    formData.append('file', this.state.file);
  }

  handleSubmit = (event) =>{
    
    event.preventDefault();
    const api = axios.create({
        baseURL : '/api/',
        timeout : 1000,
        headers : {'X-Custom-Header' : 'foobar'}
        });
    api.post('/messages',{"text": this.state.text,"file" : formData},) 
    .then(response => {
        console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        if(response.status == 201){
          alert("message posté avec succés !")
        }
    }).catch( response => {
      console.log(response.data.status); // à tester la première fois pour voir ce que retourne le serveur
        
    });

  }

/// a supprimer plus tard
  useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        minWidth: 800
      },
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    input: {
      display: 'none',
    },
  }));


  render() {
    const { login } = this.props;

    return (
      <div>
  
        <h1>
          Poster un message
        </h1>
  
        <h3>Texte </h3>
  
        <textarea id="story" name="story"
          rows="5" cols="33" value={this.state.text}
          onChange={this.changeText}>
          
          </textarea>
        
        <h3>Fichier </h3>
        <input
        accept="image/*"
        value={this.state.file}
          onChange={this.changeFile}
        id="contained-button-file"
        multiple
        type="file"
      />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span" >
            <PhotoCamera />
          </IconButton>
        </label>
  
        <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick= {this.handleSubmit }
          >
            Poster
          </Button>
        
      </div>
      
      );
    }
}


export default Post_message;
