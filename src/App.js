import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			squares: Array(9).fill(0),
			field : Array(9).fill(null),
			count: 0,
			countX : 0,
			countO : 0,
			drawCount : 0,
			ifWin : '',
			gameOver : '',
			inputData : '',
			inputCheckOne : '',
			inputCheckTwo : '',

			current : 1,
			x : 'x',
			o : 'o'

		};
		this.winnerLine = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];

    }

	selectRadio = event => {
		// console.dir(event.target.getAttribute('data'));
		let radioData = event.target.getAttribute('data');

		if (radioData === 'one') {
			this.setState({inputData : 'one'});
			this.setState({inputCheckOne : true});
			this.setState({inputCheckTwo : false});


		} else {
			this.setState({inputData : 'two'});
			this.setState({inputCheckTwo : true});
			this.setState({inputCheckOne : false});
		}
		// this.setState({inputCheckOne : event.target.checked});
	}

	isWinner = () => {



		let win = this.state.field;

		let	winX = (win[0] === 'x' && win[1] === 'x' && win[2] === 'x') ||
			(win[3] === 'x' && win[4] === 'x' && win[5] === 'x') ||
			(win[6] === 'x' && win[7] === 'x' && win[8] === 'x') ||
			(win[0] === 'x' && win[3] === 'x' && win[6] === 'x') ||
			(win[1] === 'x' && win[4] === 'x' && win[7] === 'x') ||
			(win[2] === 'x' && win[5] === 'x' && win[8] === 'x') ||
			(win[0] === 'x' && win[4] === 'x' && win[8] === 'x') ||
			(win[2] === 'x' && win[4] === 'x' && win[6] === 'x') ;

		let winO =	(win[0] === 'o' && win[1] === 'o' && win[2] === 'o') ||
			(win[3] === 'o' && win[4] === 'o' && win[5] === 'o') ||
			(win[6] === 'o' && win[7] === 'o' && win[8] === 'o') ||
			(win[0] === 'o' && win[3] === 'o' && win[6] === 'o') ||
			(win[1] === 'o' && win[4] === 'o' && win[7] === 'o') ||
			(win[2] === 'o' && win[5] === 'o' && win[8] === 'o') ||
			(win[0] === 'o' && win[4] === 'o' && win[8] === 'o') ||
			(win[2] === 'o' && win[4] === 'o' && win[6] === 'o') ;




		if( winX )
		{
			this.setState({countX: this.state.countX + 1});
			

			this.setState({ifWin: 'show'});
			this.setState({gameOver : 'Игра завершена'});

		} 
		else if( winO )
		{
			this.setState({countO: this.state.countO + 1});
			

			this.setState({ifWin: 'show'});
			this.setState({gameOver : 'Игра завершена'});


		} else if (this.state.count === 8 && !winX && !winO) {

			this.setState({drawCount: this.state.drawCount + 1});
			this.setState({ifWin: 'show'});
			this.setState({gameOver : 'Игра завершена'});
		}
		
	}



    clickHandler = event => {
        let data = event.target.getAttribute('data'),
			currentSquare = this.state.squares,
			currentField = this.state.field;


		
		if (currentSquare[data] === 0 && this.state.count % 2 === 0 && this.state.inputData === 'one') {
			
			
			currentSquare[data] = this.state.current;
			currentField[data] = this.state.x;

			this.setState({count: this.state.count + 1});


			if(this.state.current === 1) {
				this.setState({current: 2});
			}

			 
		} else if(currentSquare[data] === 0 && this.state.count % 2 !== 0 && this.state.inputData === 'one') {

			

			currentSquare[data] = this.state.current;
			currentField[data] = this.state.o;

			this.setState({count: this.state.count + 1});

			if(this.state.current === 2) {
				this.setState({current:  1});
			}

		} else if(currentSquare[data] === 0 && this.state.count % 2 === 0 && this.state.inputData === 'two') {

			currentSquare[data] = this.state.current;
			currentField[data] = this.state.o;

			this.setState({count: this.state.count + 1});

			if(this.state.current === 2) {
				this.setState({current:  1});
			}

		} else if(currentSquare[data] === 0 && this.state.count % 2 !== 0 && this.state.inputData === 'two') {

			currentSquare[data] = this.state.current;
			currentField[data] = this.state.x;

			this.setState({count: this.state.count + 1});


			if(this.state.current === 1) {
				this.setState({current: 2});
			}
		}

		this.isWinner();

	}

	restartGame = () => {
		this.setState({field : Array(9).fill(null)});
		this.setState({squares : Array(9).fill(0)});

		this.setState({ifWin: ''});
		this.setState({gameOver: ''});
		this.setState({current: 1});


		this.setState({inputData : ''});
		
		this.setState({inputCheckOne : false});
		this.setState({inputCheckTwo : false});
		this.setState({count : 0});
	}

    render() {
        return (
            <div className="container">
				<div className="selectOperator">
					<span className="option">Выберите чем будете играть:</span>

					<div className="selectOperator__wrap">
						<label ><input type="radio" name="aa" data="one"  checked={this.state.inputCheckOne} onChange={this.selectRadio}/> X</label>
						<label ><input type="radio" name="aa" data="two"  checked={this.state.inputCheckTwo} onChange={this.selectRadio}/> O</label>
					</div>
				</div>
               <div className="wrapper">
					<div className="tic-tac-toe">
						<div className="ttt-grid" onClick={this.clickHandler} data="0">{this.state.field[0]}</div>
						<div className="ttt-grid" onClick={this.clickHandler} data="1">{this.state.field[1]}</div>
						<div className="ttt-grid" onClick={this.clickHandler} data="2">{this.state.field[2]}</div>
						<div className="ttt-grid" onClick={this.clickHandler} data="3">{this.state.field[3]}</div>
						<div className="ttt-grid" onClick={this.clickHandler} data="4">{this.state.field[4]}</div>
						<div className="ttt-grid" onClick={this.clickHandler} data="5">{this.state.field[5]}</div>
						<div className="ttt-grid" onClick={this.clickHandler} data="6">{this.state.field[6]}</div>
						<div className="ttt-grid" onClick={this.clickHandler} data="7">{this.state.field[7]}</div>
						<div className="ttt-grid" onClick={this.clickHandler} data="8">{this.state.field[8]}</div>

						<div className={this.state.ifWin}>
							{this.state.gameOver}
						</div>

					</div>
					<div className="score">
						Score:
						<div><span className="x-element">X</span> выйграл : {this.state.countX + ' раз'}</div>
						<div><span className="o-element">O</span> выйграл : {this.state.countO + ' раз'}</div>
						<div><span className="draw">Ничья</span> : {this.state.drawCount + ' раз'}</div>

					</div>
			   </div>
				<button className="btn" onClick={this.restartGame}>Restart</button>
            </div>
        );
    }
}

export default App;
