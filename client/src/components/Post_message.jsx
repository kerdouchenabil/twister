import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import '../css/MainPage.css';
import FileBase64 from 'react-file-base64';
import axios from 'axios';

class Post_message extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      image: '',
      data: {}
    }
    this.handle_image = this.handle_image.bind(this);
  }

  handle_image = (image) => {
    this.setState((old_state) => ({ ...this.old_state, image }))
  }

  hello() {
    console.log(JSON.stringify(this.state))
  }

  changeText = event => {
    const val = event.currentTarget.value;
    const val1 = event.currentTarget.type
    this.setState({ ...this.state, text: val })
  }
  changeFile = event => {
    const val = event.currentTarget.value;
    this.setState({ image: val })
  }

  handleSubmit = (event) => {

    event.preventDefault();
    const api = axios.create({
      baseURL: '/api/',
      timeout: 1000,
      headers: { 'X-Custom-Header': 'foobar' }
    });
    api.post('/messages', { "text": this.state.text, "file": this.state.image },)
      .then(response => {
        console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        if (response.status == 201) {
          alert("message posté avec succés !")
        }
      }).catch(response => {
        console.log(response.status); // à tester la première fois pour voir ce que retourne le serveur
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

        <label htmlFor="icon-button-file">

          <div id="filebase" style={{ display: 'none', }}>
            <FileBase64
              type="file"

              multipe={false}
              onDone={({ base64 }) => {
                console.log(base64.length)
                this.setState({ ...this.state, image: base64 })
                //this.handle_image(base64)
                this.hello()
              }}
            />
          </div>

          <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => {
            document.getElementById('filebase').firstChild.click()
          }}>

            <PhotoCamera />
          </IconButton>
        </label>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={this.handleSubmit}
        >
          Poster
          </Button>
      </div>
    );
  }
}

export default Post_message;