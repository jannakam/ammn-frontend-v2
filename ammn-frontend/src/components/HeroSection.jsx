import React from 'react';
import Image from 'next/image';

export default function HeroSection() {
    
    return (
        <div className="banner h-screen">
            <div className="slider" style={{ '--quantity': '8' }}>
                {[...Array(8)].map((_, i) => (
                    <div
                        className="item"
                        style={{ '--position': i + 1 }}
                        key={i}
                    >
                        <Image
                            src="/card2.png"
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
