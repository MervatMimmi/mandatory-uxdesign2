import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root:{
    width: '100vw',
    height: '100vh',
    background: 'rgb(230, 230, 230)',
  },
    startbutton: {
        position: 'fixed',
        left: '50%',
        top: '50%', 
    },
    link: {
        textDecoration: 'none',
    }
  }));
  
  export default function Start() {
    const classes = useStyles();
  
    return (
      <div className = {classes.root}>
        <div className={classes.startbutton}>
          <Link className = {classes.link} to = '/Main'> 
              <Button className = {classes.button} variant="contained" color="primary">
                  Start Quiz
              </Button>
          </Link>
        </div>
      </div>
    )
}
