import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <p> bonjour !! </p>
        <div>
                <h1>Ouvrir une session</h1>
                <div class ="id">Username:<input type="text"></input> </div>
                <div class = "id">Password: <input type="password"></input> </div>
                <div><button class ="button" type="birdy_button" >Connexion</button><button class= "button" type="birdy_button" onclick="window.location.href = './enregistrement.html';">Créer un compte </button></div>
                <div><p > <a href="test.html">Mot de passe oublié ?</a> </p></div>
        </div>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>



  );
}

export default App;
