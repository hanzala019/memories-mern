import React, { useEffect, useState } from 'react';
import { AppBar, Avatar, Button, Toolbar, Typography} from '@material-ui/core'
import memories from '../../images/memories1.png';
import useStyle from './styles';
import {Link, useHistory, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

function Navbar() {
    const classes = useStyle();
    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user)

    const logout = () =>{
       dispatch({type:'LOGOUT'});
       history.push('/')
       setUser(null)
    };

    useEffect(()=>{
        const token = user?.token;

        if(token){
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new DataTransfer().getTime) logout()
            
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[location])

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography className={classes.heading} component={Link} to='/' variant='h2' align='center'>Memories</Typography>
                <img className={classes.image} src={memories} alt='memories1' height='80' width='120' />
            </div>
            <Toolbar>
                {user ? (
                            <div style={{ display: 'flex'}}>
                                <Avatar  className={classes.purple} style={{margin: '15px'}} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                                <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                                <Button variant='contained' className={classes.logout} style={{margin: '15px'}} color='secondary' onClick={logout}>Logout</Button>
                            </div>
                ): (
                            <div>
                                < Button component={Link} to='/auth' variant='contained' color='primary'>Login</Button>
                            </div>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;