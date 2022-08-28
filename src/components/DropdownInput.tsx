import type { InputHTMLAttributes } from 'react'
import { ChangeEventHandler } from 'react'
import classnames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DropdownInput: FC<Props & InputHTMLAttributes<HTMLSelectElement>> = (props) => {
	const { label, errorText, options, onChange, className, containerClassName, ...restProps } = props

	const classList = classnames(
		'appearance-none cursor-pointer text-xl w-full block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-yellow-400',
		{
			'text-black': restProps.value,
			'text-gray-400': !restProps.value,
		},
		className,
		{ 'mt-1': label !== null },
	)

	const containerClasses = classnames('relative flex items-center', containerClassName)

	const fieldId = restProps?.id || restProps?.name || undefined

	return (
		<div className="w-full">
			<div className="flex items-center">
				{label ? (
					<label htmlFor={fieldId} className="block font-medium text-gray-700">{label}</label>
				) : null}
				{errorText ? (
					<small className="flex-grow text-right text-red-600">{errorText}</small>
				) : null}
			</div>
			<div className={containerClasses}>
				<FontAwesomeIcon icon={['fal', 'chevron-down']} className="absolute h-4 right-4 mt-1 pointer-events-none" />
				<select
					onChange={onChange}
					className={classList}
					{...restProps}
				>
					<option hidden>Select One...</option>
					{Object.entries(options).map(([value, label]) => {
						return (
							<option key={value} value={value}>{label}</option>
						)
					})}
				</select>
			</div>
		</div>
	)
}

interface Props {
	label?: string | null
	errorText?: string
	options?: { [key: string]: string } | string[]
	onChange?: ChangeEventHandler<HTMLSelectElement>
	className?: string
	containerClassName?: string
}

export default DropdownInput
