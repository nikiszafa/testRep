import React from 'react'

//Tworzę komponent funkcyjny Square
export default function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>

    )
}