import React from 'react';
import Image from 'next/image';

export default function HeroSection() {
    const payments = [
        { name: 'Mastercard', src: '/payments/Mastercard.svg' },
        { name: 'Visa', src: '/payments/Visa.svg' },
        { name: 'Paypal', src: '/payments/PayPal.svg' },
        { name: 'Stripe', src: '/payments/Stripe.svg' },
        { name: 'Apple Pay', src: '/payments/ApplePay.svg' },
        { name: 'Google Pay', src: '/payments/GooglePay.svg' },
        { name: 'Amex', src: '/payments/Amex.svg' },
        { name: 'Bitcoin', src: '/payments/Bitcoin.svg' },
    ]

    return (
        <div className="banner h-screen">
            <div className="slider" style={{ '--quantity': '8' }}>
                {payments.map((_, i) => (
                    <div
                        className="item"
                        style={{ '--position': i + 1 }}
                        key={i}
                    >
                        <Image
                            src={payments[i].src}
                            alt={`Card ${i + 1}`}
                            width={280}
                            height={200}
                        />
                    </div>
                ))}
            </div>
            <div className="content">
                
                <div className="model"></div>
            </div>
        </div>
    );
}
