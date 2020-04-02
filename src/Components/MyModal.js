import React from 'react';
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
        borderRadius: '16px',
        border: '2px solid #3f51b5',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        
    },
    modalbuttons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'space-around',
    }
}));

export default function MyModal(props) {
    const classes = useStyles();
    const{modal, closeModal, score, reStart, redirectHome} = props;

    let message; 
    if (score <= 1){
        message = 'Try again';
    } else if (score >= 1 && score <= 5) {
        message = 'You can do better, try again';
    } else if(score >= 6 && score <= 9) {
        message = 'Well done!';
    } else {
        message = 'Congratulations!'
    }

    return (
        <div className = {classes.backdrop} >

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={modal}
                onClose={closeModal}
                closeAfterTransition
                disableBackdropClick = {true}
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                    
                }}
            >
                <Fade in={modal} >
                    <div className={classes.paper}>
                        <h2 tabIndex = '0'>{message}</h2>
                        <p tabIndex = '0'>
                          You answered {score}/10 questions correct!
                        </p>
                        <div className = {classes.modalbuttons}>
                            <div className={classes.restartbutton}>
                                <Button variant="contained" 
                                    color="secondary" 
                                    //onClick={closeModal} 
                                    tabIndex = '0'
                                    onClick = {reStart}
                                >
                                Re-start
                                </Button>
                            </div>
                            <div className={classes.closebutton}>
                                    <Button className = {classes.button} 
                                        variant="contained" 
                                        color="primary"
                                        onClick = {redirectHome}>
                                        Close
                                    </Button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}