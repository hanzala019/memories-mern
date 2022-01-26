import React, { useEffect, useState } from 'react';
// import './App.css';
import memories from './images/memories1.png'
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import useStyle from './styles'
import {useDispatch} from 'react-redux'
import {getPosts} from './actions/posts'

function App() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null)
  useEffect(()=>{
    dispatch(getPosts());
  },[currentId,dispatch])
  return (
  <Container maxwidth='lg'>
  <AppBar className={classes.appBar} position='static' color='inherit'>
    <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
    <img className={classes.image}  alt='memories1' height='80' width='120'/>
  </AppBar>
  
  <Grow in>
    <Container>
      <Grid className={classes.MainContainer} container  justifyContent='space-between' alignItems='stretch' spacing={3}>
          <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} ></Posts>
          </Grid>
          <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
          </Grid>
      </Grid>
    </Container>
  </Grow>
  </Container>
  );
}
export default App;
