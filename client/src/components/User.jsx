import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 400,
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

export default function User({ props, set_other_user_data }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    console.log("USER.jsx: set_other_user_data=", JSON.parse(props))
    set_other_user_data(JSON.parse(props))
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <div>
            <Avatar aria-label="recipe" className={classes.avatar}>
              {JSON.parse(props).userid}
            </Avatar>
            <h2>{JSON.parse(props).firstname + " " + JSON.parse(props).lastname}</h2>
            <h4>{"login: " + JSON.parse(props).login}</h4>
          </div>
        }

        title=""
        subheader=""
      />
      <CardActions disableSpacing>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit} ///
        >
          Show profil
          </Button>

      </CardActions>

    </Card>
  );
}