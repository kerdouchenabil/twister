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
import User from "./components/User"
import Post_message from "./components/Post_message"
import MyMessage from "./components/MyMessage"
import './css/MainPage.css';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import SearchBar from "./components/SearchBar"


import axios from 'axios';

const api = axios.create({
  baseURL: '/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

class NavigationPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = { "content": "messages", search_result:[], friends:[] }
    //
    this.user_data = {}//this.get_user_data()

    this.messages = []
    this.friends = []
    this.my_messages = []
  }

  set_search_result(data){
    this.setState({"content": "search_result", search_result:data})
  }

  refresh_my_messages(){
    api.get("/messages/of/0:1000000") // user_id=0 pour mes messages (session)
    .then(response => {
      console.log(response); // à tester la première fois pour voir ce que retourne le serveur
      if (response.status == '200') {
        this.my_messages = response.data //liste des messages
        console.log("------------->", this.my_messages)
      }
    }).catch(response => {
      //console.log(response); // à tester la première fois pour voir ce que retourne le serveur
      alert("Vous n'avez posté aucun message !")
    });
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

  show_profil(){
    this.refresh_my_messages();
    this.setState({
      content: "profil",
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
    api.get("/friends/0") 
      .then(response => {
        console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        if (response.status == '200') {
          
          this.setState({friends: response.data})  //liste des messages
          //this.showfriends();
        }
      }).catch(response => {
        console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        //alert("pas de friends à récuperer !")
    });
  }

  /*
  get_user_data(){
    api.get("/users/0") 
      .then(response => {
        console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        if (response.status == '200') {
          
          this.user_data = response.data //liste des messages
          console.log("get_user_data--> ", this.user_data)
          return response.data // a verifier
        }
      }).catch(response => {
        console.log("get_user_data catch: ", response); // à tester la première fois pour voir ce que retourne le serveur
        //alert("pas de user_data à récuperer !")
      });
  }
  */

  render() {
    const { login, logout, signup, isConnected, user_data } = this.props;


    return <div>

      {!isConnected && <Login login={login} />}

      {isConnected &&

        <div>

          <div className="header_container">

            <div>
              {isConnected && <AppBar
                show_profil={() => { this.show_profil() }}
                show_messages={() => { this.show_messages() }}
                show_friends={() => { this.show_friends() }}
                show_post_message={() => { this.show_post_message() }}
              />}
            </div>

            <div>
              
              {isConnected &&
                <h1>
                  {user_data.firstname+" "+user_data.lastname} 
                </h1>
              }
            </div>

            <div>
              <SearchBar 
                set_search = { (data) => {this.setState(data)} }
              />
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
        this.state.content == "search_result" &&
        <div>
          <h3>RESULTAT DE LA RECHERCHE</h3>
          {this.state.search_result.map((item, index) => <User key={index} props={JSON.stringify(item)} refresh={()=>this.show_friends()}/>)}
        </div>
      }


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
        isConnected && this.state.content == "profil" &&
        // eslint-disable-next-line react/jsx-pascal-case
        <div width="100" p={1} my={0.5}>
          {this.refresh_my_messages()}
          {this.my_messages.map((item, index) => <MyMessage key={index} props={JSON.stringify(item)} />)}
        </div>
      }


      {
        isConnected && this.state.content == "friends" &&
        // eslint-disable-next-line react/jsx-pascal-case
        <div width="100" p={1} my={0.5}>
          {this.state.friends.map((item, index) => <Friend key={index} props={JSON.stringify(item)} refresh={()=>this.refresh_friends()} />)}
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
