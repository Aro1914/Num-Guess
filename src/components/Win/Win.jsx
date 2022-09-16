import React from 'react'
import { useGame, useClasses } from '../../hooks'
import styles from '../../styles/Global.module.css'

const Win = () => {
	const { secret, reset } = useGame()
	return (
		<div className={useClasses(styles.contentView)}>
			<h1 className={useClasses(styles.title)}>Amazing! You got it right!</h1>
			<h2 className={useClasses(styles.title, styles.subTitle)}>The secret number was {secret}</h2>
			<div>
				<button
					className={useClasses(styles.submitBtn)}
					onClick={reset}
				>
					Play again
				</button>
			</div>
		</div>
	)
}

export default Win
