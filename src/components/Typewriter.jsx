import { useState, useEffect } from 'react';

const Typewriter = ({ text, speed = 50, delay = 0, className = "" }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStarted(true);
        }, delay);
        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, i + 1));
            i++;
            if (i >= text.length) {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [started, text, speed]);

    return (
        <span className={className}>
            {displayedText}
            {started && displayedText.length < text.length && (
                <span className="cursor" style={{
                    borderRight: '2px solid var(--primary)',
                    marginLeft: '2px',
                    animation: 'blink 1s infinite'
                }}></span>
            )}
            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>
        </span>
    );
};

export default Typewriter;
