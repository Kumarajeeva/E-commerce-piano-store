import React,{useState} from 'react';
import { Typography,Divider,Button } from '@material-ui/core';
import {Link} from "react-router-dom";
import useStyles from "./styles";

const ConfirmationPage = ({ handleEmptyCart}) => {
    const classes=useStyles();
    const [isFinished, setIsFinished] = useState(false);

    const timeout =() => {
        setTimeout(() => {
            setIsFinished(true)
        },2000);
    }

    timeout();
    
    return (
        isFinished ? (
            <>
                <div className={classes.text}>
                    <Typography variant="h5">Thank you for your purchase</Typography>
                    <Divider className={classes.divider}/> 
                </div>
                <Button component={Link} to="/" variant="outlined" type="button" className={classes.button} onClick={handleEmptyCart}> Back to Home</Button> 
            </>
        ) : null
    )
}

export default ConfirmationPage