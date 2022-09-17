import { screen } from '@testing-library/react'
import { render } from './renderCom'
import userEvent from '@testing-library/user-event'
import App from '../view/App'

describe('App view', () => {
	test('Renders the Branding', () => {
		render(<App />)
		const brand = screen.getByText(/Guess 'd Num/i)
		expect(brand).toBeInTheDocument()
	})

	test('Renders the initial message without interaction', () => {
		render(<App />)
		const initialText = screen.getByText(`you haven't made a guess`, {
			exact: false,
		})
		expect(initialText).toBeInTheDocument()
	})

	test('Renders the previous guess upon entry', () => {
		render(<App />)
		const input = screen.getByText('', { selector: '.field' })
		userEvent.clear(input)
		userEvent.tab()
		userEvent.type(input, '20')
		userEvent.tab()
		const button = screen.getByText('Submit', { selector: '.submitBtn' })
		userEvent.click(button)
		const initialText = screen.getByText(`last guess: 20`, {
			exact: false,
		})
		expect(initialText).toBeInTheDocument()
	})

	test(`Alerts 'Please enter a value' on empty entry`, () => {
		render(<App />)
		const input = screen.getByText('', { selector: '.field' })
		userEvent.clear(input)
		userEvent.tab()
		const button = screen.getByText('Submit', { selector: '.submitBtn' })
		userEvent.click(button)
		const alertMessage = screen.getByText(`Please enter a value`, {
			selector: '.message',
		})
		expect(alertMessage).toBeInTheDocument()
	})

	test(`Alerts 'So close, try something higher' on a low guess`, () => {
		render(<App />)
		const input = screen.getByText('', { selector: '.field' })
		userEvent.clear(input)
		userEvent.tab()
		userEvent.type(input, '0')
		userEvent.tab()
		const button = screen.getByText('Submit', { selector: '.submitBtn' })
		userEvent.click(button)
		const alertMessage = screen.getByText(
			`So close, try something higher`,
			{
				selector: '.message',
			}
		)
		expect(alertMessage).toBeInTheDocument()
	})

	test(`Alerts 'Nice try, but go lower' on a high guess`, () => {
		render(<App />)
		const input = screen.getByText('', { selector: '.field' })
		userEvent.clear(input)
		userEvent.tab()
		userEvent.type(input, '12')
		userEvent.tab()
		const button = screen.getByText('Submit', { selector: '.submitBtn' })
		userEvent.click(button)
		const alertMessage = screen.getByText(`Nice try, but go lower`, {
			selector: '.message',
		})
		expect(alertMessage).toBeInTheDocument()
	})

	test(`Displays the Game Config view on the click of the Config button`, () => {
		render(<App />)
		const gameTitle = screen.queryByText('Guess the number between', {
			exact: false,
		})
		expect(gameTitle).toBeInTheDocument()
		const configTitle = screen.queryByText('Game Config', {
			selector: '.title',
		})
		expect(configTitle).not.toBeInTheDocument()
		const configSwitch = screen.getByText('', {
			selector: '.inGameOption',
			exact: false,
		})
		userEvent.click(configSwitch)
		const gameTitle_ = screen.queryByText('Guess the number between', {
			exact: false,
		})
		const configTitle_ = screen.getByText('Game Config', {
			selector: '.title',
		})
		expect(configTitle_).toBeInTheDocument()
		expect(gameTitle_).not.toBeInTheDocument()
	})

	test(`Successfully displays the Game view on successful update of game parameters`, () => {
		render(<App />)
		const gameTitle = screen.queryByText('Guess the number between', {
			exact: false,
		})
		expect(gameTitle).toBeInTheDocument()
		const configTitle = screen.queryByText('Game Config', {
			selector: '.title',
		})
		expect(configTitle).not.toBeInTheDocument()
		const configSwitch = screen.getByText('', {
			selector: '.inGameOption',
			exact: false,
		})
		userEvent.click(configSwitch)
		const gameTitle_ = screen.queryByText('Guess the number between', {
			exact: false,
		})
		const configTitle_ = screen.getByText('Game Config', {
			selector: '.title',
		})
		expect(configTitle_).toBeInTheDocument()
		expect(gameTitle_).not.toBeInTheDocument()
		const upperBoundInput = screen.getByDisplayValue('10', {
			selector: '.field',
		})
		userEvent.clear(upperBoundInput)
		userEvent.tab()
		userEvent.type(upperBoundInput, '12')
		userEvent.tab()
		const lowerBoundInput = screen.getByDisplayValue('1', {
			selector: '.field',
		})
		userEvent.clear(lowerBoundInput)
		userEvent.tab()
		userEvent.type(lowerBoundInput, '6')
		userEvent.tab()
		const button = screen.getByText('Confirm', { selector: '.submitBtn' })
		userEvent.click(button)
		const alertMessage = screen.getByText(`Parameters updated`, {
			selector: '.message',
		})
		expect(alertMessage).toBeInTheDocument()
		const initialText = screen.getByText(`you haven't made a guess`, {
			exact: false,
		})
		expect(initialText).toBeInTheDocument()
	})

	test(`Alerts 'Upper bound must be higher than lower bound' on an entry higher than the upper bound for a lower bound`, () => {
		render(<App />)
		const gameTitle = screen.queryByText('Guess the number between', {
			exact: false,
		})
		expect(gameTitle).toBeInTheDocument()
		const configTitle = screen.queryByText('Game Config', {
			selector: '.title',
		})
		expect(configTitle).not.toBeInTheDocument()
		const configSwitch = screen.getByText('', {
			selector: '.inGameOption',
			exact: false,
		})
		userEvent.click(configSwitch)
		const gameTitle_ = screen.queryByText('Guess the number between', {
			exact: false,
		})
		const configTitle_ = screen.getByText('Game Config', {
			selector: '.title',
		})
		expect(configTitle_).toBeInTheDocument()
		expect(gameTitle_).not.toBeInTheDocument()
		const upperBoundInput = screen.getByDisplayValue('10', {
			selector: '.field',
		})
		userEvent.clear(upperBoundInput)
		userEvent.tab()
		userEvent.type(upperBoundInput, '12')
		userEvent.tab()
		const lowerBoundInput = screen.getByDisplayValue('1', {
			selector: '.field',
		})
		userEvent.clear(lowerBoundInput)
		userEvent.tab()
		userEvent.type(lowerBoundInput, '24')
		userEvent.tab()
		const button = screen.getByText('Confirm', { selector: '.submitBtn' })
		userEvent.click(button)
		const alertMessage = screen.getByText(
			`Upper bound must be higher than lower bound`,
			{
				selector: '.message',
			}
		)
		expect(alertMessage).toBeInTheDocument()
		expect(configTitle_).toBeInTheDocument()
	})

	test(`Successfully returns to the Game view from the Config view on click of the Config Switch button`, () => {
		render(<App />)
		const gameTitle = screen.queryByText('Guess the number between', {
			exact: false,
		})
		expect(gameTitle).toBeInTheDocument()
		const configTitle = screen.queryByText('Game Config', {
			selector: '.title',
		})
		expect(configTitle).not.toBeInTheDocument()
		const configSwitch = screen.getByText('', {
			selector: '.inGameOption',
			exact: false,
		})
		userEvent.click(configSwitch)
		const gameTitle_ = screen.queryByText('Guess the number between', {
			exact: false,
		})
		const configTitle_ = screen.getByText('Game Config', {
			selector: '.title',
		})
		expect(configTitle_).toBeInTheDocument()
		expect(gameTitle_).not.toBeInTheDocument()
		userEvent.click(configSwitch)
		const gameTitle__ = screen.getByText('Guess the number between', {
			exact: false,
		})
		const configTitle__ = screen.queryByText('Game Config', {
			selector: '.title',
		})
		expect(gameTitle__).toBeInTheDocument()
		expect(configTitle__).not.toBeInTheDocument()
	})
})
