import React from 'react'
import { useGame, useClasses as fmtClasses } from '../../hooks'
import styles from '../../styles/Global.module.css'

const Alert = () => {
	const { message, showAlert, hideAlert } = useGame()
	return (
		<>
			{showAlert && (
				<div className={fmtClasses(styles.alertContainer)}>
					<div
						className={fmtClasses(styles.mask)}
						onClick={hideAlert}
					></div>
					<div className={fmtClasses(styles.alert)}>
						<div
							className={fmtClasses(styles.cancel)}
							onClick={hideAlert}
						></div>
						<span className={fmtClasses(styles.message)}>
							{message}
						</span>
					</div>
				</div>
			)}
		</>
	)
}

export default Alert
