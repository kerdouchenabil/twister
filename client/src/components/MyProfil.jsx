import React from 'react';
import '../css/MainPage.css';
import Friend from "./Friend"
import MyMessage from "./MyMessage"

import axios from 'axios';

const api = axios.create({
  baseURL: '/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});


class MyProfil extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user_data: this.props.user_data,
      my_messages: [],
      friends: []
    }

    //importation du contenu depuis la bd
    this.refresh_my_messages()
    this.refresh_friends()

  }


  refresh_my_messages() {
    api.get("/messages/of/0:10000000000") // user_id=0 pour mes messages (session)
      .then(response => {
        console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        if (response.status == '200') {
          this.setState({ my_messages: response.data }) //liste des messages
        }
      }).catch(response => {
        //console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        alert("Vous n'avez posté aucun message !")
      });
  }


  refresh_friends() {
    api.get("/friends/0")
      .then(response => {
        console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        if (response.status == '200') {

          this.setState({ friends: response.data })  //liste des messages
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

          <h2> Mes Messages </h2>
          {
            <div width="100" p={1} my={0.5}>
              {this.state.my_messages.map((item, index) => <MyMessage key={index} props={JSON.stringify(item)} refresh={() => this.refresh_my_messages()} />)}
            </div>
          }

        </div>

        <div>
          <p>`  `</p>
        </div>

        <div>

          <h2> Mes Amis </h2>
          {
            <div width="100" p={1} my={0.5}>
              {this.state.friends.map((item, index) => <Friend key={index} props={JSON.stringify(item)} refresh={() => this.refresh_friends()} />)}
            </div>
          }

        </div>
      </div>
    );
  }
}

export default MyProfil