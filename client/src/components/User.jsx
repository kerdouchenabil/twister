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
import { Button } from '@material-ui/core';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 800,
    paddingTop: '5%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function User({props}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  let affiche_ajoute = false

 const handleSubmit = (event) =>{
        
    event.preventDefault();
    const api = axios.create({
        baseURL : '/api/',
        timeout : 1000,
        headers : {'X-Custom-Header' : 'foobar'}
        });
    api.post('/friends/'+JSON.parse(props).userid) 
      .then(response => {
        console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        if(response.status == 200){
          console.log(response);
          affiche_ajoute = true
          alert("Ami ajouté !")
          props.refresh(); /////////////////  ne marche pas !
        }

       });

  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <div>
            <Avatar aria-label="recipe" className={classes.avatar}>
            {JSON.parse(props).userid}
            </Avatar>
            <h2>{JSON.parse(props).firstname+" "+ JSON.parse(props).lastname}</h2>
            <h4>{"login: " + JSON.parse(props).login}</h4>
            { affiche_ajoute && <h3>Supprimé</h3>}
          </div>
        }
        
        title=""
        subheader=""
      />
      {/* card content supprimé ici */}
      <CardActions disableSpacing>
      <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick= {handleSubmit } ///
          >
            Follow
          </Button>
        
      </CardActions>
      
    </Card>
  );
}