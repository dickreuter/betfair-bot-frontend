import { useEffect, useState } from 'react';

export const OverrunComponent = ({ overrunBack = 0,
    overrunLay = 0,
    overrunLast = 0, }) => {
    const [isHighlighted, setIsHighlighted] = useState(false);

    useEffect(() => {
        let timer;

        if (overrunLay > 1 || overrunBack < 1) {
            setIsHighlighted(true);
            timer = setTimeout(() => {
                setIsHighlighted(false);
            }, 1000);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [overrunLay]);

    return (
        <p style={{ background: isHighlighted ? 'transparent' : 'transparent' }}>
            Sum of odds (back/lay/last) {overrunBack.toFixed(2)}
            /{overrunLay.toFixed(2)}
            / {overrunLast.toFixed(2)}
        </p>
    );
}