import React from 'react'
class SignUp extends React.Component {

    constructor(props){
        super(props);
        //
    }

    render() {

        const { login } = this.props;

        return <div className="SignUpform">
        <h2>Sign Up</h2>
        <main>
            <section>
                <section>
                    <div>
                        <label>Prénom</label>
                        <input type="text"/>
                    </div> 
                    <div>   
                        <label>Nom</label>
                        <input type="text"/>

                    </div>
                    </section>
                    <section>
                    <div>
                        <label>Login</label>
                        <input type="text"/>
                    </div> 
                    <div>   
                        <label>Password</label>
                        <input type="password"/>

                    </div>
                    <div>   
                        <label>Password again</label>
                        <input type="password"/>

                    </div>
                    </section>
                    
                    <button onClick={() => { login(); }}>Créer un compte</button>
                    
            </section>
        </main>
             
      </div>;
    }
  }
  
  export default SignUp;












