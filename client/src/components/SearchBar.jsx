import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import '../css/MainPage.css';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import axios from 'axios';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      data: []
    }
  }

  changeText = event => {
    const val = event.currentTarget.value;
    //const val1 = event.currentTarget.type
    this.setState({ text: val })
  }

  handleSubmit = (event) => {

    event.preventDefault();
    const api = axios.create({
      baseURL: '/api/',
      timeout: 1000,
      headers: { 'X-Custom-Header': 'foobar' }
    });
    api.get("/user/search/" + this.state.text)
      .then(response => {
        //console.log("response=", response); // à tester la première fois pour voir ce que retourne le serveur
        //console.log("text=", this.state.text)
        if (response.status == 200) {

          this.setState({ data: response.data })
          //console.log("Resultats de la recherche pour le mot ",this.state.text, "  data: ", this.state.data) //debug
          this.props.set_search({ "content": "search_result", search_result: this.state.data })
        }
      }).catch(response => {
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
            onClick={this.handleSubmit}
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
