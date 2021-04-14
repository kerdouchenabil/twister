import React from 'react'
import Button from '@material-ui/core/Button';


class Logout extends React.Component {
  render() {
    return <Button variant="contained" color='secondary' onClick={this.props.logout}>Se déconnecter</Button>
  }
}

export default Logout;
