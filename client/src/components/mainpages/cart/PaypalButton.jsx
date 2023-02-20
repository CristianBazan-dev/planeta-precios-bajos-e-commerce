import React from 'react';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

function PaypalButton({total, tranSuccess}) {

    const createOrder = (data,actions)=>{
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: total
                }
            }]
    })
    .then((orderId) => {
        return orderId
    });
}


    const onApprove = (data, actions) => {
        return actions.order.capture()
        .then( (payment) =>{
           console.log(payment)
           tranSuccess(payment)
          
        })
    }

    const onError = (err) => {
        console.log("Error!", err)
    }
 



    return (
        <div>
        <PayPalScriptProvider options={{ "client-id": "AZ1qjJM1g8RoTxVsiIBQcL23jMwEjUJuWfv_1ufm3R4T2j591JjCnAPLby7I-lgWHmCRF06eHzMQ0lnK" }}>

            <PayPalButtons
                
                createOrder = {createOrder}
                onApprove = {onApprove} 
                onError = {onError}
            ></PayPalButtons>
            
        </PayPalScriptProvider>
        </div>
    );
}


export default PaypalButton;