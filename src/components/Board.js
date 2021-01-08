import React, {Component} from 'react';
//importuje już utworzony komponent Square
import Square from "./Square";

//Tworzę komponent klasowy Board

class Board extends Component {
    //Funkcja renderSquare zwraca komponent Square którego wartość pochodzi z komponentu board
    //onClick pochodzi tez z komponentu Board i wysyła parametr i
    renderSquare(i) {
        return <Square value={this.props.squares[i]}
                       onClick={() => this.props.onClick(i)}
        />
    }

//Komponent board tworzy plansze dla naszej gry kółko i krzyżyk
//Poniżej kształtują się kwadratowe pola naszej planszy (i)
    render() {
        return (
            <div>
                <div className="border-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}

                </div>
                <div className="border-row">
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}

                </div>
                <div className="border-row">
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                    {this.renderSquare(10)}
                    {this.renderSquare(11)}

                </div>
                <div className="border-row">
                    {this.renderSquare(12)}
                    {this.renderSquare(13)}
                    {this.renderSquare(14)}
                    {this.renderSquare(15)}

                </div>
            </div>
        );
    }
}

export default Board;