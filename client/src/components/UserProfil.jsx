import React from 'react';
import Button from '@material-ui/core/Button';
import '../css/MainPage.css';
import Message from './Message';
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
      friends: [],
      followed: false
    }
    //importation du contenu depuis la bd
    this.refresh_my_messages(this.state.user_data.userid)//(this.state.user_data.userid)
    this.refresh_friends(this.state.user_data.userid)//(this.state.user_data.userid)
  }

  refresh_my_messages(userid = this.state.user_data.userid) {
    console.log("user_profil: refresh_my_messages: ", this.state.user_data.userid)
    api.get("/messages/of/" + userid + ":10000000000") // user_id=0 pour mes messages (session)
      .then(response => {
        console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        if (response.status == '200') {
          this.setState({ my_messages: response.data }) //liste des messages
        }
      }).catch(err => {
        //console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        alert("Vous n'avez posté aucun message !")
      });
  }

  refresh_friends(userid = this.state.user_data.userid) {
    api.get("/friends/" + userid)
      .then(response => {
        console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        if (response.status == '200') {

          this.setState({ friends: response.data })  //liste des messages
          //this.showfriends();
        }
      }).catch(err => {
        console.log(err); // à tester la première fois pour voir ce que retourne le serveur
      });
  }

  handleSubmit = (event) => {

    event.preventDefault();
    const api = axios.create({
      baseURL: '/api/',
      timeout: 1000,
      headers: { 'X-Custom-Header': 'foobar' }
    });
    api.post("/friends/" + this.state.user_data.userid)
      .then(response => {
        //console.log(response.data); // à tester la première fois pour voir ce que retourne le serveur
        //this.props.login(response.data["status_key"])
        if (response.status == 201) {
          this.setState({ followed: true })
          alert(this.state.user_data.firstname + " " + this.state.user_data.lastname + "  Followed")
        }
      })
      .catch(err => {
        alert("You can not follow this user again !")
      });
  }


  render() {
    return (
      <div>

        <div /*className="header_container_small"*/ >
          <div></div>

          <div className="nom_user">
            <h1>{this.state.user_data.firstname + " " + this.state.user_data.lastname}</h1>
          </div>

          {!this.state.followed &&
            <div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.handleSubmit}
                aria-label="search"
              >
                Follow
            </Button>
            </div>
          }

          <div></div>

        </div>

        <div className="header_container_profil">

          <div>

            <h2> Messages </h2>
            {
              <div width="100" p={1} my={0.5}>
                {this.state.my_messages.map((item, index) => <Message key={index} props={JSON.stringify(item)} refresh={() => this.refresh_my_messages()} />)}
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
                {this.state.friends.map((item, index) => <UserFriend key={index} props={JSON.stringify(item)} refresh={() => this.refresh_friends()} />)}
              </div>
            }

          </div>
        </div>
      </div>
    );
  }
}

export default UserProfil