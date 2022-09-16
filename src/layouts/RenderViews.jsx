import React from 'react'
import { useGame } from '../hooks'

const RenderViews = (Views) => {
	const { view } = useGame()
	const View = Views[view]
	return <View />
}

export default RenderViews
