import React from 'react'
import { useGame, useClasses } from './hooks'
import styles from './styles/Global.module.css'

const Game = () => {
	const { setBounds, generateSecret } = useGame()

	return (
		<div>
			<h3>Game Config</h3>

			<label htmlFor='upper'>
				<span>Upper Bound</span>
				<input
					type='number'
					name='upper'
					id='upper'
					placeholder={`Enter a number`}
					onChange={(e) => {
						setBounds((bounds) => ({
							...bounds,
							upperBound: e.currentTarget.value,
						}))
					}}
				/>
			</label>

			<label htmlFor='lower'>
				<span>Lower Bound</span>
				<input
					type='number'
					name='lower'
					id='lower'
					placeholder={`Enter a number`}
					onChange={(e) => {
						setBounds((bounds) => ({
							...bounds,
							lowerBound: e.currentTarget.value,
						}))
					}}
				/>
			</label>

			<div>
				<button onClick={generateSecret}>Reset</button>
			</div>
		</div>
	)
}

export default Game
