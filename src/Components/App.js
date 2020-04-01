import React from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import { makeStyles} from '@material-ui/core/styles';

import Header from './Header';
import Start from './Start';
import Main from './Main/Main';
import MyModal from './MyModal';


const useStyles = makeStyles(theme => ({
  root: {
    background: 'rgb(230, 230, 230)',
    display: 'flex',
    flexDirection : 'column',
  }
}))

function App() {
  const classes = useStyles();
  
  return (
    <Router>
    <div className={classes.root}>
      <Header/>
      <Route exact path = '/' component = {Start} />
      <Route path = '/Main' component = {Main} />
      <Route path = '/MyModal' component = {MyModal} />
    </div>
    </Router>
  );
}

export default App;
