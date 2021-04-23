import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextField from '@material-ui/core/TextField';
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


const useStyles = makeStyles((theme) => ({
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



export default function UploadButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <h1>
        Poster un message
      </h1>

      <h3>Texte </h3>

      <TextField>
        id="filled-multiline-static"
        label="Multiline"
        multiline
        rows={4}
        defaultValue="Default Value"
        variant="filled"
      </TextField>
      
      <h3>Fichier </h3>

      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>

      <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick= {alert("OK !")/*this.handleSubmit ************  a regler  *************/}
        >
          Poster
        </Button>
      
    </div>
  );


}