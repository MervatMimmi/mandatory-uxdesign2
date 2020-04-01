import React, { useState } from 'react';
import {AppBar, Toolbar, Typography, IconButton, Drawer} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
    appBar : {
        position: 'static', 
        color: 'inherit',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        theme: {
            color: 'inherit',
            display: 'none',
        }
    },
    drawer: {
        theme: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
}));

export default function Header(){
    const classes = useStyles();
    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = useState(false);

    const handleDrawer = (open) => event => {
        console.log('event: ' + event.type, event.key);
        if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer(!openDrawer, open);
    }

    
    return(
        <AppBar className = {classes.appBar}>
            <Toolbar>
                <IconButton
                    className = {classes.menuButton}
                    arial-label = 'Open drawer'
                    edge = 'start'
                    onClick = {handleDrawer(true)}
                >
                    <MenuIcon />
                    <Drawer
                        className = {classes.drawer}
                        variant = 'temporary'
                        anchor = {theme.direction === 'rtl' ? 'right' : 'left'} 
                        open = {openDrawer}
                        role="presentation"
                        onClose = {handleDrawer}
                    >
                    </Drawer>
                </IconButton>
                <Typography variant = 'h6' color = 'inherit'>
                    Quiz Master Application
                </Typography>
            </Toolbar>
        </AppBar>
    )
}