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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment'
import CommentIcon from '@material-ui/icons/Comment';
import { sizing } from '@material-ui/system';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
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

export default function Message({ props, usr, refresh }) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false);

  const [state, setState] = React.useState({
    text: "",
  });

  let changeText = event => {
    const val = event.currentTarget.value;
    setState({ ...state, text: val })
  }

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleSubmit = (event) => {

    event.preventDefault();
    const api = axios.create({
      baseURL: '/api/',
      timeout: 1000,
      headers: { 'X-Custom-Header': 'foobar' }
    });
    api.put('/messages/like/' + JSON.parse(props)._id)
      .then(response => {
        console.log(response); // à tester la première fois pour voir ce que retourne le serveur
        if (response.status == 200) {
          console.log(response);
          handleLikeClick()
          refresh() //
        }
      });
  }

  const handleSubmitcomment = (event) => {

    event.preventDefault();
    const api = axios.create({
      baseURL: '/api/',
      timeout: 1000,
      headers: { 'X-Custom-Header': 'foobar' }
    });

    api.put('/messages/comment/' + JSON.parse(props)._id, { "user": usr.userid, "firstname": usr.firstname, "lastname": usr.lastname, "text": state.text },)
      .then(response => {
        if (response.status == 200) {
          refresh() //
        }
      });
  }

  return (
    <Card id="message" className={classes.root}>
      <CardHeader
        avatar={
          <div>
            <Avatar aria-label="recipe" className={classes.avatar}>
              {JSON.parse(props).user}
            </Avatar>
            <h2>{JSON.parse(props).firstname + " " + JSON.parse(props).lastname}</h2>
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

        {
          (!liked) &&

          <IconButton aria-label="like" onClick={handleSubmit}>
            <FavoriteIcon />
          </IconButton>
        }

        <h3>Réagissez au poste  </h3>

        <textarea id="story" name="story"
          rows="5" cols="33" value={state.text}
          onChange={changeText}>

        </textarea>
        <IconButton aria-label="comment" onClick={handleSubmitcomment /* comment_message() ; show_profil() */}>
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

          {JSON.parse(props).comments.map((item, index) => <Typography paragraph> <h4>{item.firstname + " " + item.lastname}</h4>  {item.text} </Typography>)}

          <Typography paragraph>  </Typography>

        </CardContent>
      </Collapse>
    </Card>
  );
};