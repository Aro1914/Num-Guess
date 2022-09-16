import React, { createContext, useState } from 'react'

export const GameContext = createContext()

const GameContextProvider = ({ children }) => {
	const [defaults] = useState({
		upperBound: 10,
		lowerBound: 1,
		secret: Math.floor(Math.random() * 10) + 1,
	})
	const [
		[isFirst, setIsFirst],
		[lastGuess, setLastGuess],
		[passed, setPassed],
		[message, setMessage],
		[alertResolve, setAlertResolve],
		[showAlert, setShowAlert],
		[bounds, setBounds],
		[secret, setSecret],
		[view, setView],
	] = [
		useState(true),
		useState(0),
		useState(false),
		useState(''),
		useState({}),
		useState(false),
		useState({
			upperBound: defaults.upperBound,
			lowerBound: defaults.lowerBound,
		}),
		useState(defaults.secret),
		useState('Game'),
	]

	const sleep = (milliseconds) =>
		new Promise((resolve) => {
			setAlertResolve((lastResolve) => ({ resolve }))
			return setTimeout(resolve, milliseconds)
		})

	const alertThis = (message) => {
		setMessage((lastMessage) => message)
		setShowAlert((lastState) => true)
		sleep(message.length * 300).then(() => {
			setShowAlert((lastState) => false)
			setMessage((lastState) => '')
		})
	}

	const hideAlert = () => {
		alertResolve.resolve()
	}

	const reset = () => {
		setSecret(
			(lastState) =>
				Math.floor(Math.random() * defaults.upperBound) +
				defaults.lowerBound
		)
		setBounds((bounds) => ({
			upperBound: defaults.upperBound,
			lowerBound: defaults.lowerBound,
		}))
		setIsFirst((lastState) => true)
		setLastGuess((lastState) => 0)
		setPassed((lastState) => false)
		setView((lastState) => 'Game')
	}

	const generateSecret = (x, y) => {
		const upper = Number(x)
		const lower = Number(y)
		const newSecret = lower + Math.round(Math.random() * (upper - lower))
		setSecret((lastState) => newSecret)
		setIsFirst((lastState) => true)
		setLastGuess((lastState) => 0)
		setView((lastState) => 'Game')
	}

	const GameContextValues = {
		isFirst,
		setIsFirst,
		lastGuess,
		setLastGuess,
		passed,
		setPassed,
		message,
		showAlert,
		setShowAlert,
		bounds,
		setBounds,
		secret,
		view,
		setView,
		sleep,
		alertThis,
		hideAlert,
		reset,
		generateSecret,
	}

	return (
		<GameContext.Provider value={GameContextValues}>
			{children}
		</GameContext.Provider>
	)
}

export default GameContextProvider
