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
import moment from 'moment'
import DeleteIcon from '@material-ui/icons/Delete';
import CommentIcon from '@material-ui/icons/Comment';

import { sizing } from '@material-ui/system';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
  root: {
    width:"90%",
    maxWidth: 1200, //'auto'
    minWidth: 400,
    //maxHeight: 200 //prob

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

export default function MyMessage({props}) {

  const { delete_message, show_profil } = props;

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleSubmit = (event) =>{
        
    event.preventDefault();
    const api = axios.create({
        baseURL : '/api/',
        timeout : 1000,
        headers : {'X-Custom-Header' : 'foobar'}
        });
    api.put('/messages/like/'+JSON.parse(props)._id) 
      .then(response => {
        console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        if(response.status == 200){
          console.log(response);
          
          alert("liked !")
          //refresh(); /////////////////  ne marche pas !
        }

       });

  }
  const handleSubmitdelete = (event) =>{
        
    event.preventDefault();
    const api = axios.create({
        baseURL : '/api/',
        timeout : 1000,
        headers : {'X-Custom-Header' : 'foobar'}
        });
    api.delete('/messages/delete/'+JSON.parse(props)._id) 
      .then(response => {
  
        console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        if(response.status == 200){
          alert("deleted !")
          //refresh(); /////////////////  ne marche pas !
        }

       })
       .catch(error =>{
         console.log(error.message)
       })

  }
  return (

    <Card id="message" className={classes.root}>
      <CardHeader
        avatar={
          <div>
            <Avatar aria-label="recipe" className={classes.avatar}>
            {JSON.parse(props).user}
            </Avatar>
            <h2>{JSON.parse(props).firstname+" "+ JSON.parse(props).lastname}</h2>
          </div>
          
          
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        
        title={JSON.parse(props).text}//{props.title}
        subheader={moment(JSON.parse(props).date).fromNow()} //regler
      />
      <CardMedia
        className={classes.media}
        image={JSON.parse(props).file}
        title={JSON.parse(props).image_title}
      />
      <CardContent>
        <Typography variant="body2" color="a modifier !" component="p">
          {JSON.parse(props).likes}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

        <IconButton aria-label="like" onClick={handleSubmit}>
          <FavoriteIcon />
        </IconButton>

        <IconButton aria-label="delete" onClick={handleSubmitdelete}>
          <DeleteIcon />
        </IconButton>

        <IconButton aria-label="comment" onClick={() => { alert('type your comment !') ; /* comment_message() ; show_profil() */ }}>
          <CommentIcon />
        </IconButton>

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

