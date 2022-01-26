import { Button, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useStyle from './styles'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux';
import {createPost, updatePost} from '../../actions/posts'


const Form = ({ currentId, setCurrentId}) => {


    const dispatch = useDispatch();

    const [postData, setPostData] = useState({title:'', creator:'', message:'', tags:'', selectedFile:''});
    const posts = useSelector((state)=> currentId ? state.posts.find((p)=>p._id === currentId) : null);

  useEffect(()=>{
    if(posts) setPostData(posts)
  },[posts])


    const handleSubmit = (e) =>{
        e.preventDefault();
        
        if(currentId){
          dispatch(updatePost(currentId,postData))
        }
        else {
          dispatch(createPost(postData))
        }
        clear()
    };


    const clear = () => {
      setCurrentId(null)
      setPostData({title:'', creator:'', message:'', tags:'', selectedFile:''})
    };

    const classes = useStyle();
    return (
        <Paper className={classes.paper}>
          <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant='h6'> {currentId ?'Editing Memories' : 'Creating Memories'}</Typography>
            <TextField name='creator' variant='outlined' label='Creator' fullWidth value={postData.creator} onChange={(e)=> setPostData({...postData, creator: e.target.value})}/>
            <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e)=> setPostData({...postData, title: e.target.value})}/>
            <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e)=> setPostData({...postData, message: e.target.value})}/>
            <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e)=> setPostData({...postData, tags: e.target.value.split(',')})}/>
            <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth type='submit'>Submit</Button>
            <Button onClick={clear} variant="contained" color="secondary" size="small" fullWidth >Clear</Button>
           
          </form>
        </Paper>
    );
};

export default Form;