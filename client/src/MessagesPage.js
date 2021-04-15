import React from 'react'
import Logout from './Logout';
import Message from './components/Message';

class MessagesPage extends React.Component {

  constructor(props){
    super(props);
    //
  }

  
  render() {

    const { isConnected, logout } = this.props

    return (

      <nav id="messages">
        
        <Message />

        
      </nav>
 
    )
  }
}

export default MessagesPage;