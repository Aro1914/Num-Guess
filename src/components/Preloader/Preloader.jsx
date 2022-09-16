import React, { useState, useEffect } from 'react'
import { useGame, useClasses as fmtClasses } from '../../hooks'
import styles from '../../styles/Preloader.module.css'

const Preloader = () => {
	const { sleep } = useGame()
	const [preloaderClass, setPreloaderClass] = useState(
		fmtClasses(styles.container)
	)

	const fadeOff = () => {
		sleep(3000).then(() => {
			setPreloaderClass(fmtClasses(styles.container, styles.invisible))
			sleep(400).then(() => {
				setPreloaderClass(
					fmtClasses(
						styles.container,
						styles.invisible,
						styles.terminated
					)
				)
			})
		})
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(fadeOff, [])

	return (
		<div className={preloaderClass}>
			<div className={fmtClasses(styles.circle, styles.c1)}></div>
			<div className={fmtClasses(styles.circle, styles.c2)}></div>
			<div className={fmtClasses(styles.circle, styles.c3)}></div>
		</div>
	)
}

export default Preloader
