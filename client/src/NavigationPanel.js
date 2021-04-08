import React from 'react'
import Login from './Login'
import Logout from './Logout'

class NavigationPanel extends React.Component {

  constructor(props){
    super(props);
    //
  }

  render() {
    const { login, logout, signup, isConnected } = this.props;
    
    return <nav id="navPanel">
      {isConnected
        ? <Logout logout={logout} />
        : <Login login={login} />}
      {!isConnected && <p>
        Vous n'avez pas encore de compte ? <br></br>
        <button onClick={() => { signup(); }}>S'inscrire</button>
      </p>}
    </nav>;
  }
}

export default NavigationPanel;
