import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextField from '@material-ui/core/TextField';
import '../css/MainPage.css';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';

import axios from 'axios';

class SearchBar extends React.Component {
  state = {

    text : '',
    data:{}
  }   
  changeText = event => {
    const val = event.currentTarget.value;
    const val1 = event.currentTarget.type
    this.setState({text : val})
  }

  handleSubmit = (event) =>{
    
    event.preventDefault();
    const api = axios.create({
        baseURL : '/api/',
        timeout : 1000,
        headers : {'X-Custom-Header' : 'foobar'}
        });
    api.post("/user/search/nabil"+this.state.text) 
    .then(response => {
        console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        if(response.status == 200){
          console.log("Resultats de la recherche pour le mot ",this.state.text, " : ", response)
        }
    }).catch( response => {
      console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        
    });

  }


  render() {
    const { show_search } = this.props;

    return (
        <div className="header_container_small">
            <div>
                
                <Input
                    value={this.state.text}
                    onChange={this.changeText}
                />
                
            </div>
            <div>
                <IconButton 
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick= {this.handleSubmit }
                    aria-label="search"
                >
                    <SearchIcon />
                </IconButton>
            </div>
        </div>
      );
    }

}


export default SearchBar