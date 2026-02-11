import { useEffect, useState } from 'react';

const ParticlesBackground = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const particleCount = 20;
        const newParticles = [];

        for (let i = 0; i < particleCount; i++) {
            newParticles.push({
                id: i,
                left: Math.random() * 100,
                size: Math.random() * 6 + 4,
                duration: Math.random() * 20 + 10,
                delay: Math.random() * 5
            });
        }

        setParticles(newParticles);
    }, []);

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: 0
        }}>
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        left: `${p.left}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`
                    }}
                />
            ))}
        </div>
    );
};

export default ParticlesBackground;
