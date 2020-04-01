import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


const useStyles = makeStyles(theme => ({
    backdrop: {
    '&:before': {
        position: 'fixed',
        top: '0',
        left: '0',
        background: '#000',
        opacity: '0.8',
        zIndex: '998',
        height: '100%',
        width: '100%',
    },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        postion: 'absolut',
        zIndex: '999',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function MyModal(props) {

    const classes = useStyles();
    const{modal, closeModal} = props;

    return (
        <div className = {classes.backdrop}>

            

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={modal}
                onClose={closeModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modal} >
                    <div className={classes.paper}>
                        <h2 tabIndex = '0'>Animated React Modal</h2>
                        <p tabIndex = '0'>
                          
                        </p>
                        <Button variant="contained" color="secondary" onClick={closeModal} tabIndex = '0'>
                           Re-start
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}