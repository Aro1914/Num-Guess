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
		const button = screen.getByText('Submit')
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
		const button = screen.getByText('Submit')
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
		const button = screen.getByText('Submit')
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
		const button = screen.getByText('Submit')
		userEvent.click(button)
		const alertMessage = screen.getByText(`Nice try, but go lower`, {
			selector: '.message',
		})
		expect(alertMessage).toBeInTheDocument()
	})

	test(`Displays the Game Config view on the click of the Config button`, () => {
		render(<App />)
	})
})
