import logo from './logo.svg';
//
import Test from './components/Test'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { sizing } from '@material-ui/system';

import Button from '@material-ui/core/Button';
import Message from './components/Message';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';


import AppBar from './components/AppBar'


import './App.css';

function App() {
  return (
    <div>
    <div className="container">
      <div>
      <Button variant="contained" color="primary" onClick={() => {  }}>S'inscrire</Button>
      </div>
      <div>
      <Button variant="contained" color="primary" onClick={() => {  }}>S'inscrire</Button>
      </div>
    </div>

    <div className="container">
      <div>
      <Button variant="contained" color="secondary" onClick={() => {  }}>S'inscrire</Button>
      </div>
      <div>
      <button variant="contained" color="primary" onClick={() => {  }}>S'inscrire</button>
      </div>
    </div>    

    </div>

  );
}

export default App;
