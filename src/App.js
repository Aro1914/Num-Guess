import guess from '../public/guess.jpg'
import { useGame, useClasses } from './hooks'
import styles from './styles/Global.module.css'

const App = () => {
	const {
		isFirst,
		setIsFirst,
		guess,
		setGuess,
		lastGuess,
		passed,
		setPassed,
		setMessage,
		sleep,
		alertThis,
		reset,
  } = useGame()
  
  return <div className={ useClasses(styles.app) }>
    
  </div>
}

export default App
