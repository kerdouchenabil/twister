import React from 'react'

class Login extends React.Component {
  render() {
    return <div className="LoginForm">
      <div class = "div">
          <h1>Connexion</h1>
          <div class ="id">Username:<input type="text"></input> </div>
          <div class = "id">Password: <input type="password"></input> </div>
          <button class ="button" onClick={() => { this.props.login() }}>Se connecter</button>
          <div><p> <a href="test.html">Mot de passe oublié ?</a> </p></div>
      </div>
        
      
    </div>;
  }
}

export default Login;
