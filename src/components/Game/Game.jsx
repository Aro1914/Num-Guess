import React, { useState } from 'react'
import { useGame, useClasses } from '../../hooks'
import styles from '../../styles/Global.module.css'

const Game = () => {
	const {
		isFirst,
		setIsFirst,
		lastGuess,
		setLastGuess,
		passed,
		setPassed,
		bounds,
		alertThis,
		secret,
		setView,
	} = useGame()

	const [guess, setGuess] = useState('')

	const evaluate = () => {
		setIsFirst((lastState) => false)
		if (guess === '') {
			alertThis('Please enter a value')
		} else if (Number(guess) === Number(secret)) {
			setPassed((lastState) => true)
			setView((lastState) => 'Win')
			setGuess((lastState) => '')
		} else if (Number(guess) < secret) {
			alertThis('So close, try something higher')
			setLastGuess((lastState) => guess)
		} else {
			alertThis('Nice try, but go lower')
			setLastGuess((lastState) => guess)
		}
	}

	return (
		<div className={useClasses(styles.contentView)}>
			<h2 className={useClasses(styles.title)}>
				Guess the number between {bounds.lowerBound} and{' '}{bounds.upperBound}
			</h2>
			<h4 className={useClasses(styles.title, styles.subTitle)}>
				{passed
					? `Yay! You got it!`
					: isFirst
					? `You haven't made a guess yet`
					: `Last Guess: ${lastGuess}`}
			</h4>

			<div className={useClasses(styles.flat)}>
				<label
					htmlFor='guess'
					className={useClasses(styles.inputContainer)}
				>
					<span className={useClasses(styles.label)}>
						Make a Guess
					</span>
					<input
						type='number'
						name='guess'
						id='guess'
						placeholder={`Between ${bounds.lowerBound} and ${bounds.upperBound}`}
						onChange={(e) => {
							setGuess(e.currentTarget.value)
						}}
						className={useClasses(styles.field)}
					/>
				</label>

				<div className={useClasses(styles.buttonDiv)}>
					<button
						className={useClasses(styles.submitBtn)}
						onClick={evaluate}
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	)
}

export default Game
