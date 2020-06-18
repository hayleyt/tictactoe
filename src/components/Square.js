import React from 'react';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick} onChange={props.onChange}>
            {props.value}
        </button>
    );
}

export default Square;