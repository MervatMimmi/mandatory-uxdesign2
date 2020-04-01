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
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let message; 
        if(props.point === 0){
            message = 'Not so good! Try again';
        } else if (props.point >= 5 && props.point <= 6){
            message = 'Not bad!';
        } else {
            message = 'Well Done!';
        }

    return (
        <div className = {classes.backdrop}>

            <Button variant="contained" color="secondary" onClick={handleOpen}>
                Open Animated Modal
            </Button>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open} out = {!open}>
                    <div className={classes.paper}>
                        <h2>Animated React Modal</h2>
                        <p>
                            {message}
                        </p>
                        <Button variant="contained" color="secondary" onClick={handleClose}>
                            Open Animated Modal
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}