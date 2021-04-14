import React from 'react'
import Login from './Login'
import Logout from './Logout'
import Button from '@material-ui/core/Button';

class NavigationPanel extends React.Component {
/*
  constructor(props){
    super(props);
    //
  }
*/
  render() {
    const { login, logout, signup, isConnected } = this.props;
    
    return <nav id="navPanel">
      {isConnected
        ? <Logout logout={logout} />
        : <Login login={login} />}
      {!isConnected && <p>
        Vous n'avez pas encore de compte ?
        <Button variant="contained" color="primary" onClick={() => { signup(); }}>S'inscrire</Button>
      </p>}
    </nav>;
  }
}

export default NavigationPanel;
