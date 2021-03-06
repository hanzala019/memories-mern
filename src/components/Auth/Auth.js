import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import useStyle from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {GoogleLogin} from 'react-google-login';
import Input from './Input';
import Icon from './Icon';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {signin, signup} from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email:'', password:'', confirmPassword:''};

const Auth = () => {
    const classes = useStyle()
    const [isSignup, setIsSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const googleId = '521119349977-780s2ea552ul2flcv17h6p985ott94tp.apps.googleusercontent.com'



    const handleSubmit = (e) => { 
        e.preventDefault();

        if(isSignup){
            dispatch(signup(formData,history))
        }
         else {
            dispatch(signin(formData,history))
        }
    };

    const handleChange = (e) => {
        
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleShowPassword = () => {
            
            setShowPassword((prevShowPassword)=> !prevShowPassword)
        
    }

    const switchMode = () => {
        
        setIsSignup(!isSignup)
        
    }

    const googleSuccess = async  (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: 'AUTH', data:{result, token}});
            history.push('/')
        } catch (error) {
            console.log(error)
        }
        
    }
    const googleError = () => {
        console.log('Google sign in failure. Please try again ')
    }


    return (
       <Container component='main' maxWidth='xs'>
           
           <Paper className={classes.paper} elevation={3}>
              <Avatar >
                  <LockOutlinedIcon color='primary'/>
              </Avatar>
              <Typography variant ='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
              <form className={classes.form} onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>

                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
                                    <Input name='lastName' label='Last Name' handleChange={handleChange}  half/>

                                </>
                            )
                        }
                        <Input name ='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name ='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
                  </Grid>
                
                  <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} onSubmit={handleSubmit} >
                            {isSignup ? 'Sign Up' : 'Sign In'}
                  </Button>
                  <GoogleLogin
            clientId={googleId}
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
                  <Grid container justifyContent='center'>
                        <Grid item>
                            <Button variant='outlined' color='primary' onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up Here"}
                            </Button>
                        </Grid>
                  </Grid>
              </form>
           </Paper>
       </Container>
    );
};

export default Auth;