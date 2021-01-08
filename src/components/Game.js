import React, {Component} from 'react';
import Board from "./Board";

//Tworzę komponent klasowy Game
class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Flaga określająca gracza wykonującego ruch
            //true ponieważ gracz X rozpoczyna grę
            xIsNext: true,
            //0 ponieważ nie ma ruchów na początku gry
            stepNumber: 0,
            //tablica przechowująca historię ruchów
            //fill(null) ponieważ na początku nie ma żadnych ruchów
            history: [
                {squares: Array(16).fill(null)}
            ]
        }
    }

    //Funkcja pozwalająca wrócić się do danego ruchu
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    //Definiujemy klasę handleClick
    //Dzieki niej mozemy na zmianę zaznaczać kółko i krzyżyk
    handleClick(i) {
        //tworzymy kopie historii ruchów
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        //current jest to ostatni element w historii ruchów
        const current = history[history.length - 1]
        //kopia scores
        const squares = current.squares.slice();
        const winner = calculateWinner(squares);
        //Wykrywanie wygranego, jesli bedziemy miec linie tych samych znakow
        //nie bedziemy mogli dalej zaznaczac
        if (winner || squares[i]) {
            return;
        }
        //jesli xIsNet true nastepny gracz to "X" jesli fałsz następny to "O"
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat({
                squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            //Jesli jest to poczatek gry to wyswietli sie "Rozpocznij gre"
            const desc = move ? "Go to #" + move : 'Rozpocznij gre';
            return (
                <li key={move}>
                    <button onClick={() => {
                        this.jumpTo(move)
                    }}>
                        {desc}
                    </button>
                </li>
            )
        });
        let status;
        if (winner) {
            status = 'Winner is ' + winner;
        } else {
            status = 'Next Player is ' + (this.state.xIsNext ? 'X' : 'O');
        }


        return (
            <div className="game">
                <div className="game-board">
                    <Board onClick={(i) => this.handleClick(i)}
                           squares={current.squares}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ul>{moves}</ul>
                </div>
            </div>
        );
    }
}

//Funkcja wykrywająca zwycięzce gry
function calculateWinner(squares) {
    //tablica zawierajaca zwycieskie pozycje aby wygrać gre
    const lines = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [0, 5, 10, 15],
        [12, 9, 6, 3]
    ];
    //Petla sprawdzajaca czy istnieje wygrywająca linia
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c, d] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c] && squares[c] === squares[d] && squares[d]) {
            return squares[a];
        }

    }
    return null;
}

export default Game;