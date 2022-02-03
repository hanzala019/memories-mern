import React from 'react';
import { useEffect, useState } from 'react';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import {Container, Grow, Grid} from '@material-ui/core'
import useStyle from './styles'
import {useDispatch} from 'react-redux'
import {getPosts} from '../../actions/posts'

const Home = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null)
  useEffect(()=>{
    dispatch(getPosts());
  },[currentId,dispatch])

    return (
       
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
    );
};

export default Home;