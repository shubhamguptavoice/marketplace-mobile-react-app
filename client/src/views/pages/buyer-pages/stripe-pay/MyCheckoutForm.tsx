import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import './MyCheckoutForm.css';
export interface IMyCheckoutForm {}
const totalPrice = 6000; //payment of rs 60

export const MyCheckoutForm: React.FC<IMyCheckoutForm> = () => {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState('');
    const [processing, setProcessing] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');

    const stripe = useStripe();
    const elements = useElements();

    // create a payment intent
    useEffect(() => {
        fetch('http://localhost:8001/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ price: totalPrice })
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setClientSecret(data.clientSecret);
            });
    }, []);
    const cardStyle = {
        style: {}
    };

    // handle input errors
    const handleChange = async (event: any) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : '');
    };

    const handleSubmit = async (ev: any) => {
        ev.preventDefault();

        setProcessing(true);

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (cardElement) {
            const payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement
                }
            });

            if (payload.error) {
                setError(`Payment failed ${payload.error.message}`);
                setProcessing(false);
            } else {
                setError('');
                setProcessing(false);
                setSucceeded(true);
            }
        }
    };
    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
            <button disabled={processing || disabled || succeeded} id="submit">
                <span id="button-text">{processing ? <div className="spinner" id="spinner"></div> : 'Pay now'}</span>
            </button>
            {error && (
                <div className="card-error" role="alert">
                    {error}
                </div>
            )}
            <p className={succeeded ? 'result-message' : 'result-message hidden'}>
                Payment succeeded, see the result in your
                <a href={`https://dashboard.stripe.com/test/payments`}> Stripe dashboard.</a> Refresh the page to pay again.
            </p>
        </form>
    );
};
