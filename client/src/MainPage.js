import React from 'react';
import NavigationPanel from './NavigationPanel';
import MessagesPage from './MessagesPage';
import SignUp from './SignUp';
import './login.css';

class MainPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {isConnected : false, currentPage : "login"};
        //this.getConnected = this.getConnected.bind(this);
    }
    setConnected = () => {
        this.setState({
          isConnected: true,
          currentPage: 'messages',
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
    
    render() {
        const { isConnected, currentPage } = this.state;
    
        return <div>
          <h1>Twister</h1>
          
          
          { //bouton logout qui s'affiche si on est connecté
            isConnected && <button onClick={() => { this.setLogout(); }}>Se déconnecter</button>
          }

          <main>
            {
              currentPage === 'login' &&
              <NavigationPanel
                isConnected={isConnected}
                login={() => { this.setConnected() }}  
                logout={() => { this.setLogout() }}  
                signup={() => { this.signup() }}
              />
            }


            {currentPage === 'messages' && 
              <MessagesPage 
                logout={() => { this.setLogout() }}  //param ici ou mettre directement dans page principale
              
              />
            }

            {currentPage === 'signup' && 
              <SignUp
                login={() => { this.setConnected() }} 
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
