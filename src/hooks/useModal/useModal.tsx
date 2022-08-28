import type { ComponentProps, ElementType } from 'react'
import { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { useLockedBody } from 'usehooks-ts'
import ModalProvider from '@contexts/ModalProvider'
import Modal, { ModalTransition } from './Modal'

export interface ModalInterface {
  toggle: () => void
  isOpen: boolean
}

interface ModalOptions {
  transition?: ModalTransition
  removeExitButton?: boolean
  removeBackground?: boolean
  exitOnBackgroundClick?: boolean
}

function useModal<T extends ElementType>(BodyComponent: T, props: ComponentProps<T> = null, options: ModalOptions = {}): ModalInterface {
	options = Object.assign({
		transition: ModalTransition.SLIDE_TOP,
		removeExitButton: false,
		removeBackground: false,
		exitOnBackgroundClick: true,
	}, options)

	const [, setLocked] = useLockedBody()
	const [open, setOpen] = useState(false)
	const modalContainerRef = useRef(null)
	const [rootModal, setRootModal] = useState(null)

	const handleExit = () => {
		setOpen(false)
	}

	const modalProps = {
		toggle: () => {
			setOpen(!open)
		},
		isOpen: open,
	}

	const modal = (
		<Modal
			open={open}
			onExitPress={handleExit}
			transition={options.transition}
			removeExitButton={options.removeExitButton}
			removeBackground={options.removeBackground}
			exitOnBackgroundClick={options.exitOnBackgroundClick}
		>
			<ModalProvider toggle={modalProps.toggle} isOpen={modalProps.isOpen}>
				<BodyComponent {...props} />
			</ModalProvider>
		</Modal>
	)

	useEffect(() => {
		if (open) {
			setLocked(true)
			const element = document.createElement('div')
			modalContainerRef.current = element
			document.getElementById('__next').appendChild(element)
			let root = rootModal
			if (!root) {
				root = createRoot(modalContainerRef.current)
				setRootModal(root)
			}
			root.render(modal)
		} else if (!open && modalContainerRef.current) {
			let root = rootModal
			if (!root) {
				root = createRoot(modalContainerRef.current)
				setRootModal(root)
			}
			root.render(modal)
			setTimeout(() => {
				modalContainerRef.current.remove()
				setRootModal(null)
			}, 150)
		}

		if (!open) {
			setLocked(false)
		}
	}, [open, modal, rootModal, setLocked])

	return modalProps
}

export default useModal
