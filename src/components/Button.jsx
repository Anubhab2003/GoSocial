import React from 'react';

function Button({
    text,
    type = 'button',
    className = '',
    ...props
}) {
    return (
        <button
            className={`px-4 py-2 rounded-full  text-white shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 ${className}`}
            type={type}
            {...props}
        >
            {text}
        </button>
    );
}

export default Button;
