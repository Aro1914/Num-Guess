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
		[guess, setGuess],
		[lastGuess, setLastGuess],
		[passed, setPassed],
		[message, setMessage],
		[alertResolve, setAlertResolve],
		[showAlert, setShowAlert],
		[bounds, setBounds],
		[secret, setSecret],
	] = [
		useState(true),
		useState(0),
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
	]

	const sleep = (milliseconds) =>
		new Promise((resolve) => {
			setAlertResolve(resolve)
			return setTimeout(resolve, milliseconds)
		})

	const alertThis = async (message) => {
		setMessage(message)
		setShowAlert(true)
		await sleep(message.length * 300)
		setShowAlert(false)
		setMessage('')
	}

	const hideAlert = () => {
		alertResolve.resolve()
	}

	const reset = () => {
		setIsFirst(true)
		setGuess(0)
		setLastGuess(0)
		setPassed(false)
	}

	const generateSecret = () => {
		setSecret(
			Math.floor(Math.random() * bounds.upperBound) + bounds.lowerBound
		)
	}

	const GameContextValues = {
		isFirst,
		setIsFirst,
		guess,
		setGuess,
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
