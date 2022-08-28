import type { ButtonHTMLAttributes } from 'react'
import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'

const Button: FCC<Props & ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
	const { color, small, icon, type, className, disabled, loading, ...additionalProps } = props

	const classList = classnames([
		'flex', 'justify-center', 'items-center', 'appearance-none',
		'select-none', 'w-full', 'p-2', 'tap-highlight-none',
		// Text
		'font-medium', 'text-black',
		// Focus
		'focus:outline-none', 'focus:ring',
		// Ring
		'ring',
		// Disabled
		'disabled:bg-gray-300', 'disabled:ring-gray-300', 'disabled:cursor-not-allowed', 'disabled:text-gray-400',
		// Scale on click
		'scale-on-click',
		'rounded-sm',
	], {
		'h-10': !small,
		'h-8 md:h-6': small,
	}, {
		// Primary
		'bg-amber-300': color === 'primary',
		'ring-amber-300': color === 'primary',
		'hover:bg-amber-400': color === 'primary',
		'hover:ring-amber-400': color === 'primary',
	}, className)

	const loadingIconClasses = classnames('animate-spin', {
		'h-5': !small,
		'w-5': !small,
		'h-4': small,
		'w-4': small,
		'md:h-3': small,
		'md:w-3': small,
	})

	const iconClasses = classnames('mr-3', {
		'h-4': !small,
		'h-3': small,
	})

	return (
		<button type={type || 'button'} disabled={disabled || loading} className={classList} {...additionalProps}>
			{loading ? (
				<FontAwesomeIcon icon={['fas', 'spinner-third']} className={loadingIconClasses} />
			) : (
				<>
					{icon ? <FontAwesomeIcon icon={icon} className={iconClasses} /> : null}
					{props.children}
				</>
			)}
		</button>
	)
}

Button.defaultProps = {
	loading: false,
	small: false,
	color: 'primary',
	fill: true,
}

type Colors = 'primary'

interface Props {
	loading?: boolean
	icon?: IconProp
	small?: boolean
	color?: Colors
	fill?: boolean
}

export default Button
