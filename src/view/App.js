import * as Game from '../components/Game'
import * as GameConfig from '../components/GameConfig'
import * as Win from '../components/Win'
import RenderViews from '../layouts/RenderViews'
import { useClasses } from '../hooks'
import styles from '../styles/Global.module.css'
import { Alert } from '../components/Alert'
import { ConfigSwitch } from '../components/ConfigSwitch'
import { Preloader } from '../components/Preloader';

const App = () => {
	const Views = {
		...Game,
		...GameConfig,
		...Win,
	}

	return (
		<div className={ useClasses(styles.app) }>
			<Preloader/>
			<Alert />
			<div className={ useClasses(styles.imageBox) }>
				<h1 className={ useClasses(styles.brand) }>Guess 'd Num</h1>
				<ConfigSwitch />
			</div>
			<RenderViews {...Views} />
		</div>
	)
}

export default App
