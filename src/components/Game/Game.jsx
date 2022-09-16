import React from 'react'
import { useGame, useClasses } from './hooks'
import styles from './styles/Global.module.css'

const Game = () => {
	const {
		isFirst,
		guess,
		setGuess,
		lastGuess,
		setLastGuess,
		passed,
		setPassed,
		bounds,
		alertThis,
		secret,
	} = useGame()

	const evaluate = async () => {
		if (guess === secret) {
			setPassed(true)
			await alertThis('That was correct!!')
		} else if (guess < secret) {
			setLastGuess(guess)
			await alertThis('So close, try something higher')
		} else {
			setLastGuess(guess)
			await alertThis('Nice try, but go lower')
		}
	}

	return (
		<div>
			<h3>
				Guess the number between {bounds.upperBound} and
				{bounds.lowerBound}
			</h3>
			{passed ? (
				<span>Yay! You got it!</span>
			) : isFirst ? (
				<span> You haven't made a guess</span>
			) : (
				<span>Last Guess: {lastGuess}</span>
			)}

			<label htmlFor='guess'>
				<span>Guess</span>
				<input
					type='number'
					name='guess'
					id='guess'
					placeholder={`Enter a number between ${bounds.upperBound} and ${bounds.lowerBound}`}
					onChange={(e) => {
						setGuess(e.currentTarget.value)
					}}
				/>
			</label>

			<div>
				<button onClick={evaluate}>Submit</button>
			</div>
		</div>
	)
}

export default Game
