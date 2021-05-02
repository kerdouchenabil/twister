import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextField from '@material-ui/core/TextField';
import '../css/MainPage.css';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import Message from './Message';
import Friend from "./Friend"
import MyMessage from "./MyMessage"
import User from "./User"
import UserFriend from "./UserFriend"

import axios from 'axios';

const api = axios.create({
  baseURL: '/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});


class UserProfil extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        user_data: this.props.props,
        my_messages: [],
        friends: []
    }   

    console.log("-->USERPROFIL: this.props.userid= ", this.state.user_data.userid)
    //importation du contenu depuis la bd
    this.refresh_my_messages(this.state.user_data.userid)//(this.state.user_data.userid)
    this.refresh_friends(this.state.user_data.userid)//(this.state.user_data.userid)

  }


  refresh_my_messages(userid = this.state.user_data.userid){
    console.log("user_profil: refresh_my_messages: ", this.state.user_data.userid)
    api.get("/messages/of/"+userid+":10000000000") // user_id=0 pour mes messages (session)
    .then(response => {
      console.log(response); // à tester la première fois pour voir ce que retourne le serveur
      if (response.status == '200') {
        this.setState({my_messages : response.data}) //liste des messages
      }
    }).catch(err => {
      //console.log(response); // à tester la première fois pour voir ce que retourne le serveur
      alert("Vous n'avez posté aucun message !")
    });
  }


  refresh_friends(userid = this.state.user_data.userid){
    api.get("/friends/"+userid) 
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



  render() {
    //const { props } = this.props;

    return (
        <div className="header_container_profil">
            <div>
                
                <h2> Messages </h2>
                {
                  <div width="100" p={1} my={0.5}>
                    {this.state.my_messages.map((item, index) => <Message key={index} props={JSON.stringify(item)} refresh={()=>this.refresh_my_messages()} />)}
                  </div>
                }
                
            </div>

            <div>
              <p>`  `</p>
            </div>
            
            <div>
                
                <h2> Amis </h2>
                {
                  <div width="100" p={1} my={0.5}>
                    {this.state.friends.map((item, index) => <UserFriend key={index} props={JSON.stringify(item)} refresh={()=>this.refresh_friends()} />)}
                  </div>
                }
                
            </div>
        </div>
      );
    }

}


export default UserProfil
