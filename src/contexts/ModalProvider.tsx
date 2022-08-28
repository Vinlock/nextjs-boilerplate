import { createContext, useContext } from 'react'
import Router from 'next/router'

export interface ModalProviderProps {
  toggle?: () => void
  isOpen?: boolean
}

const ModalContext = createContext<ModalProviderProps>({
	toggle: () => null,
	isOpen: false,
})

const ModalProvider: FCC<ModalProviderProps> = (props) => {
	Router.events.on('routeChangeComplete', () => {
		if (props.isOpen) {
			props.toggle()
		}
	})

	return (
		<ModalContext.Provider value={{ toggle: props.toggle, isOpen: props.isOpen }}>
			{props.children}
		</ModalContext.Provider>
	)
}

export const useModalContext = () => useContext(ModalContext)

export default ModalProvider

