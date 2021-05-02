import React from 'react'
import '../css/MainPage.css';
import Friend from "./Friend"

/*
const api = axios.create({
  baseURL: '/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});
*/
class ListFriends extends React.Component {

  constructor(props) {
    super(props);
    //this.state = { "content": "list" }
    //
    this.friends = []
  }

  /*
    refresh_friends(id) {
    
      
        api.get("friends/1")
        .then(response => {
          console.log(response); // à tester la première fois pour voir ce que retourne le serveur
          if (response.status == '200') {
            this.friends = response.data //liste des amis
  
          }
        }).catch(response => {
          //console.log(response); // à tester la première fois pour voir ce que retourne le serveur
          alert("pas de friends à récuperer !")
        });
  
    }
  */
  render() {
    const { userid } = this.props;

    return <div>

      {
        userid &&
        // eslint-disable-next-line react/jsx-pascal-case
        <div width="100" p={1} my={0.5}>
          {this.friends.map((item, index) => <Friend key={index} props={JSON.stringify(item)} />)}
        </div>
      }

    </div>;
  }
}

export default ListFriends;
