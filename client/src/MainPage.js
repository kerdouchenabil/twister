import React from 'react';
import NavigationPanel from './NavigationPanel';
import MessagesPage from './MessagesPage';
import SignUp from './SignUp';
import AppBar from './components/AppBar'

import Test from './components/Test'

import './css/MainPage.css';
import logo from './twister_anim.gif';
//import logo from './logo.svg';  
//import logo from './Twister_bleu.png';


class MainPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {isConnected : false, currentPage : "login"};
        //this.getConnected = this.getConnected.bind(this);
    }
    setConnected = () => {
        this.setState({
          isConnected: true,
          currentPage: 'login',
        });
      }
    
      setLogout = () => {
        this.setState({
          isConnected: false,
          currentPage: 'login',
        });
      }
    
      signup = () => {
        this.setState({ currentPage: 'signup' });
      }

      // a verif, n'est pas utilisée
      signin = () => {
        this.setState({ currentPage: 'login' });
      }
    
    render() {
        const { isConnected, currentPage } = this.state;
    
        return <div>

            
              
              <div className="header_container">

              
                
              </div>
              { ! isConnected &&
              <div className="container">
                <img src={logo} alt="logo" className="twister_logo" height="200" width="18%" />
              </div>   
              }

          <main >
            {
              currentPage === 'login' &&
              <NavigationPanel
                isConnected={isConnected}
                login={() => { this.setConnected() }}  
                logout={() => { this.setLogout() }}  
                signup={() => { this.signup() }}
                signin={() => { this.signin() }}
              />
            }


            {currentPage === 'messages' && 
              <MessagesPage 

                isConnected={() => { this.isConnected() }}
                logout={() => { this.setLogout() }}  //param ici ou mettre directement dans page principale
              
              />
            }

            {currentPage === 'signup' && 
              <SignUp
                login={() => { this.setConnected() }} 
                logout={() => { this.setLogout() }} 
              />
            }

          </main>
        </div>;
    }
}
function getValue() {
    // Sélectionner l'élément input et récupérer sa valeur
    var input = document.getElementById("in").value;
    // Afficher la valeur
    return input ;
}


export default MainPage;
