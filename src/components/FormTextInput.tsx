import type { InputHTMLAttributes, MouseEventHandler, MutableRefObject } from 'react'
import { useEffect, useRef } from 'react'
import classnames from 'classnames'
import InputMask from 'react-input-mask'

const FormTextInput: FC<Props & InputHTMLAttributes<HTMLInputElement>> = (props) => {
	const { label, info, className, inputRef, errorText, prefix, inputClassName, mask, ...restProps } = props

	const primaryInputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (inputRef) {
			inputRef.current = primaryInputRef.current
		}
	}, [inputRef, primaryInputRef.current])

	const classList = classnames('w-full', className)

	const containerClassList = classnames('flex items-center border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-yellow-400 px-3 py-2',
		{ 'mt-1': label !== null },
	)

	const inputClassList = classnames(
		'text-xl w-full block focus:outline-none',
		inputClassName,
	)

	const fieldId = restProps?.id || restProps?.name || undefined

	const handlePrefixClick: MouseEventHandler<HTMLSpanElement> = () => {
		primaryInputRef?.current && primaryInputRef.current.focus()
	}

	let inputField = <input {...restProps} id={fieldId} className={inputClassList} ref={primaryInputRef} />
	if (mask) {
		inputField = <InputMask mask={mask} maskChar={null} {...restProps} id={fieldId} className={inputClassList} inputRef={primaryInputRef} />
	}

	return (
		<div className={classList}>
			<div className="flex items-center">
				{label ? (
					<label htmlFor={fieldId} className="block font-medium text-gray-700">{label}</label>
				) : null}
				{errorText ? (
					<small className="flex-grow text-right text-red-600">{errorText}</small>
				) : null}
			</div>
			<div className={containerClassList}>
				{prefix ? <span onClick={handlePrefixClick} className="text-xl text-gray-400 cursor-text select-none">{prefix}</span> : null}
				{inputField}
			</div>
			{info ? (
				<div className="pt-0.5 px-2">
					<small className="text-gray-500">{info}</small>
				</div>
			) : null}
		</div>
	)
}

FormTextInput.defaultProps = {
	label: null,
	info: null,
}

interface Props {
  label?: string | null
	info?: string | JSX.Element | null
	errorText?: string
	inputRef?: MutableRefObject<HTMLInputElement>
	prefix?: string | JSX.Element | null
	inputClassName?: string
	mask?: string | (string | RegExp)[]
}

export default FormTextInput
