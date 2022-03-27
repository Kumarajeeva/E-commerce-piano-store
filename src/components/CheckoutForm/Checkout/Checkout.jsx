import React, {useState, useEffect} from "react";
import {Paper, Stepper, Step, StepLabel, Typography, Button, Divider, CssBaseline } from "@material-ui/core";
import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import {commerce} from "../../../library/commerce";
import { Link, useNavigate } from "react-router-dom";

const steps = ["Shipping address", "Payment details"];


const Checkout = ({ cart, order, onCaptureCheckout, error}) => {

    const [activeStep,setActiveStep] = useState(0);
    const [checkoutToken,setCheckoutToken] = useState(null);
    const [shippingData,setShippingData] = useState({});

    const classes=useStyles();
    const navigate=useNavigate();

    useEffect(() => {
        const generateToken = async() => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: "cart"});

                setCheckoutToken(token);
            } catch (error) {
                navigate("/");
            }
        }

        generateToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep+1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep-1);
    

    const next = (data) => {
        setShippingData(data);

        nextStep();
    }


    let Confirmation = () =>  (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase</Typography>
                <Divider className={classes.divider}/>   
            </div>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button"> Back to Home</Button>
        </>
    ) 

    if(error){
        <>
            <Typography varinat="h5">Error: {error}</Typography>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button"> Back to Home</Button>
        </>
    }

    const Form = () => activeStep===0
        ? <AddressForm checkoutToken={checkoutToken} next={next}/>
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout} />

    return (
        <>
        <CssBaseline/>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={0} className={classes.stepper}> 
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep===steps.length ? < Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>

    )
}

export default Checkout