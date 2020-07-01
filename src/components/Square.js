import React from 'react';

function Square(props) {
    return (
        <button className={
            props.value === "X" ? "square x-mark" :
                props.value === "O" ? "square o-mark" : "square"
            }
            onClick={props.onClick} 
            onChange={props.onChange}
            >
                {props.value}
        </button>
    );
}

export default Square;