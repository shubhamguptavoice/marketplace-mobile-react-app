import React from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { MyCheckoutForm } from './MyCheckoutForm';
import './stripePay.css';

const StripePay = () => {
    const stripePromise = loadStripe(
        'pk_test_51M7E3TSIJFk7VEcMYRWQ1UOpQQPvupmUQZjDUuSn0h3vuaxRTAXVEki50TA5GCyWJ9dEn18NeTHSbPvdXW3Uk45100S4bZcyEV'
    );

    return (
        <MainCard title="Payment Page">
            <Elements stripe={stripePromise}>
                <MyCheckoutForm />
            </Elements>
        </MainCard>
    );
};

export default StripePay;
