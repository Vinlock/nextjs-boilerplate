import { useState, useEffect, LegacyRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'

enum ModalState {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export enum ModalTransition {
  SLIDE_TOP = 'SLIDE_TOP',
  FADE = 'FADE',
}

const Modal: FCC<Props> = (props) => {
	const [state, setState] = useState<ModalState>(ModalState.CLOSED)

	useEffect(() => {
		setTimeout(() => {
			if (props.open) {
				setState(ModalState.OPEN)
			} else {
				setState(ModalState.CLOSED)
			}
		}, 0)
	}, [props.open])

	const outerContainerClasses = classnames([
		'bg-gray-900', 'bg-opacity-75', 'fixed', 'top-0', 'px-5',
		'w-full', 'h-screen', 'items-center', 'flex',
		// Transitions
		'transition-opacity', 'duration-150', 'ease-in', 'z-10',
	], {
		'opacity-0': state !== ModalState.OPEN,
		'opacity-100': state === ModalState.OPEN,
		'pointer-events-none': state !== ModalState.OPEN,
		'pointer-events-auto': state === ModalState.OPEN,
	})

	const containerClasses = classnames([
		'p-6', 'relative', 'mx-auto',
		'transition-all', 'ease-in-out', 'w-full', 'md:w-auto',
		'transform-gpu', 'opacity-0',
	], {
		'bg-white rounded-xl shadow-xl': !props.removeBackground,
		'duration-150': props.transition === ModalTransition.SLIDE_TOP,
		'duration-100': props.transition === ModalTransition.FADE,
		'-translate-y-52': props.transition === ModalTransition.SLIDE_TOP && state !== ModalState.OPEN,
		'-translate-y-30 md:-translate-y-20': props.transition === ModalTransition.SLIDE_TOP && state === ModalState.OPEN,
		'opacity-100': state === ModalState.OPEN,
	})

	return (
		<div className={outerContainerClasses} ref={props.ref} onClick={props.exitOnBackgroundClick ? props.onExitPress : () => null}>
			<div className={containerClasses} onClick={(e) => e.stopPropagation()}>
				{!props.removeExitButton ? (
					<FontAwesomeIcon
						icon={['fal', 'times']}
						className="absolute right-0 top-0 cursor-pointer max-w-4 mx-3.5 my-2"
						onClick={props.onExitPress}
					/>
				) : null}
				{props.children}
			</div>
		</div>
	)
}

Modal.defaultProps = {
	transition: ModalTransition.SLIDE_TOP,
	removeExitButton: false,
	removeBackground: false,
	exitOnBackgroundClick: true,
}

interface Props {
  open: boolean
  withExitButton?: boolean
  onExitPress?: () => void
  ref?: LegacyRef<HTMLDivElement>
  transition?: ModalTransition
  removeExitButton?: boolean
  removeBackground?: boolean
  exitOnBackgroundClick?: boolean
}

export default Modal
