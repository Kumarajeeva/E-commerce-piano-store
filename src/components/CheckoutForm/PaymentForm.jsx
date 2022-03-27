import React from "react";
import {Button,Typography,Divider} from "@material-ui/core";
import {Elements, CardElement, ElementsConsumer} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";

import Review from "./Review";

const stripePromise=loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, shippingData, backStep, onCaptureCheckout, nextStep, timeout, Confirmation }) => {

  // eslint-disable-next-line no-lone-blocks  
  {/*  const handleSubmit = async (event, elements, stripe) => {
      const cardElement = elements.getElement(CardElement);

      const {error,paymentMethod} = await stripe.createPaymentMethod({type: "card", card: cardElement});

      if(error){
        console.log(error)
      } else {
        const orderData = {
          line_items: checkoutToken.live.line_items,
          customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email},
          shipping: {
            name: "Primary",
            street: shippingData.address1,
            town_city: shippingData.city,
            county_state: shippingData.shippingSubdivision,
            postal_zip_code: shippingData.zip,
            country: shippingData.shippingCountry
          },
          fulfillment: { shipping_method: shippingData.shippingOption},
          payment: {
            gateway: "stripe",
            stripe: {
              payment_method_id: paymentMethod.id
            }
          }
        }

        onCaptureCheckout(checkoutToken.id, orderData);

        timeout();

        nextStep();

      }
    }  
  */}


  return (
    <>
      <Review checkoutToken={checkoutToken}/>
      <Divider/>
      <Typography gutterBottom variant="h6" style={{margin: "20px 0"}}>Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
              <form >
                  <CardElement/>
                  <br/> <br/>
                  <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Button variant="outlined" onClick={backStep}>Back</Button>
                    <Button component={Link} to="/confirm" type="button" variant="contained" disabled={!stripe} color="primary" >
                      Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                    </Button>
                  </div>
              </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentForm