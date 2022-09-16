import React from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { AiFillSetting } from 'react-icons/ai'
import { useGame, useClasses as fmtClasses } from '../../hooks'
import styles from '../../styles/Global.module.css'

const ConfigSwitch = () => {
	const { passed, view, setView } = useGame()
	const switchView = () => {
		view === 'Game'
			? setView((lastState) => 'GameConfig')
			: setView((lastState) => 'Game')
	}
	return (
		<>
			{!passed ? (
				<div
					className={fmtClasses(styles.inGameOption)}
					onClick={switchView}
				>
					{view === 'Game' ? <AiFillSetting /> : <BiLeftArrowAlt />}
				</div>
			) : (
				''
			)}
		</>
	)
}

export default ConfigSwitch
