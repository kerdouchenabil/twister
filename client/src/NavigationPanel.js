import React from 'react'
import Login from './Login'
import Logout from './Logout'
import Button from '@material-ui/core/Button';
import Message from './components/Message';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import AppBar from './components/AppBar'
import Test from './components/Test'
//import List_friends from "./components/List_friends"
import Friend from "./components/Friend"
import Post_message from "./components/Post_message"
import './css/MainPage.css';
import axios from 'axios';

const api = axios.create({
  baseURL: '/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

class NavigationPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = { "content": "messages" }
    //
    this.messages = []
    this.friends = []
  }

  show_friends() {
    this.refresh_friends();
    this.setState({
      content: "friends",
    });
  }

  show_post_message() {
    this.setState({
      content: "post_message",
    });
  }

  show_messages() {
    this.refresh_messages();
    this.setState({
      content: "messages",
    });
  }

  refresh_messages(max = 1000000, etat = false) {
      //api.get(`/messages/${max}:${etat}`) //remettre celle ci
      api.get("/messages/1000000:false")
      .then(response => {
        console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        if (response.status == '200') {
          
          this.messages = response.data //liste des messages
          console.log("------------->", this.messages)
        }
      }).catch(response => {
        //console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        alert("pas de messages à récuperer !")
      });

  }

  refresh_friends(){
    api.get("/friends/1") // changer le 1 , juste pour tester
      .then(response => {
        console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        if (response.status == '200') {
          
          this.friends = response.data //liste des messages
          console.log("------------->", this.friends)
        }
      }).catch(response => {
        //console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        alert("pas de messages à récuperer !")
      });
  }

  render() {
    const { login, logout, signup, isConnected } = this.props;


    return <div>
      {!isConnected && <Login login={login} />}

      {isConnected &&

        <div>

          <div className="header_container">

            <div>
              {isConnected && <AppBar
                show_messages={() => { this.show_messages() }}
                show_friends={() => { this.show_friends() }}
              />}
            </div>

            <div>
              <Logout logout={logout} />
            </div>

          </div>

        </div>
      }


      {/*
        this.state.content == "friends" &&
        // eslint-disable-next-line react/jsx-pascal-case
        <List_friends props={JSON.stringify({ "title": "titre du post", "avatar": "Z" })} />
      */}


      {
        this.state.content == "post_message" &&
        // eslint-disable-next-line react/jsx-pascal-case
        <Post_message props={JSON.stringify({ "title": "titre du post", "avatar": "Z" })} />
      }


      {
        isConnected && this.state.content == "messages" &&
        // eslint-disable-next-line react/jsx-pascal-case
        <div width="100" p={1} my={0.5}>
          {this.refresh_messages()}
          {this.messages.map((item, index) => <Message key={index} props={JSON.stringify(item)} />)}
        </div>
      }


      {
        isConnected && this.state.content == "friends" &&
        // eslint-disable-next-line react/jsx-pascal-case
        <div width="100" p={1} my={0.5}>
          {this.refresh_friends()}
          {this.friends.map((item, index) => <Friend key={index} props={JSON.stringify(item)} />)}
        </div>
      }


      {!isConnected && <p>
        Vous n'avez pas encore de compte ?
        <Button variant="contained" color="primary" onClick={() => { signup(); }}>S'inscrire</Button>
      </p>}
    </div>;
  }
}

export default NavigationPanel;
