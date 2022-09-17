import { render } from '@testing-library/react'
import GameContextProvider from '../context/GameContext'

export const renderCom = (component) => {
	render(<GameContextProvider>{component}</GameContextProvider>)
}

export { renderCom as render }
