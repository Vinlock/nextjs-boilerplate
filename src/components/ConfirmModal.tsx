import { useEffect, useState } from 'react'
import Button from '@components/Button'
import { ModalProviderProps, useModalContext } from '@contexts/ModalProvider'

const ConfirmModal: FC<Props> = (props) => {
	const [loading, setLoading] = useState(false)
	const modal = useModalContext()

	const handleAction = async () => {
		let closeModal = true

		setLoading(true)
		try {
			if (props.action) {
				await props.action(modal)
			}
			if (props.postAction) {
				closeModal = await props.postAction(null, modal) || false
			}
		} catch (err) {
			if (props.postAction) {
				closeModal = await props.postAction(err, modal) || false
			}
		}

		if (closeModal) {
			modal.toggle()
		}
		setLoading(false)
	}

	useEffect(() => {
		if (modal.isOpen) {
			props.onOpen && props.onOpen(modal)
		} else {
			props.onClose && props.onClose(modal)
		}
	}, [modal.isOpen])

	return (
		<div className="text-left w-full md:w-96">
			<h2 className="text-xl font-bold mb-4">{props.title}</h2>
			<div className="mb-6">
				{props.body ? props.body() : null}
			</div>
			<Button loading={loading} onClick={handleAction}>{props.actionText}</Button>
		</div>
	)
}

ConfirmModal.defaultProps = {
	actionText: 'Okay',
}

interface Props {
  title: string
  body?: () => (string | JSX.Element)
  actionText?: string
  action?: (modal: ModalProviderProps) => Promise<void>
  postAction?: (err: Error | null, modal: ModalProviderProps) => Promise<boolean | void>
  onClose?: (modal: ModalProviderProps) => Promise<void>
  onOpen?: (modal: ModalProviderProps) => Promise<void>
}

export default ConfirmModal
