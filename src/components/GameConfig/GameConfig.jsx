import React, { useState } from 'react'
import { useGame, useClasses } from '../../hooks'
import styles from '../../styles/Global.module.css'

const Game = () => {
	const { bounds, setBounds, setView, generateSecret, alertThis } = useGame()
	const [[upperBound, setUpperBound], [lowerBound, setLowerBound]] = [
		useState(bounds.upperBound),
		useState(bounds.lowerBound),
	]

	const handleInput = (e) => {
		const [name, value] = [e.currentTarget.name, e.currentTarget.value]
		if (name === 'lower') {
			setLowerBound((lastState) => value)
		} else {
			setUpperBound((lastState) => value)
		}
	}

	const confirm = () => {
		if (Number(upperBound) <= Number(lowerBound)) {
			alertThis(
				`Upper Bound must be higher than lower bound`
			)
		} else {
			setBounds((bounds) => ({
				upperBound: Number(upperBound),
				lowerBound: Number(lowerBound),
			}))
			generateSecret(upperBound, lowerBound)
			setView((lastState) => 'Game')
			alertThis('Parameters Updated')
		}
	}

	return (
		<div className={useClasses(styles.contentView)}>
			<h2 className={useClasses(styles.title)}>Game Config</h2>

			<div className={useClasses(styles.flat)}>
				<label
					htmlFor='upper'
					className={useClasses(styles.inputContainer)}
				>
					<span className={useClasses(styles.label)}>
						Upper Bound
					</span>
					<input
						type='number'
						name='upper'
						id='upper'
						placeholder={`Enter a number`}
						onChange={handleInput}
						value={upperBound}
						className={useClasses(styles.field)}
					/>
				</label>

				<label
					htmlFor='lower'
					className={useClasses(styles.inputContainer)}
				>
					<span className={useClasses(styles.label)}>
						Lower Bound
					</span>
					<input
						type='number'
						name='lower'
						id='lower'
						placeholder={`Enter a number`}
						onChange={handleInput}
						value={lowerBound}
						className={useClasses(styles.field)}
					/>
				</label>

				<div className={useClasses(styles.buttonDiv)}>
					<button
						className={useClasses(styles.submitBtn)}
						onClick={confirm}
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	)
}

export default Game
