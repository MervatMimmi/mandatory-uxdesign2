import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
                <Fade in={modal} out = {!modal}>
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