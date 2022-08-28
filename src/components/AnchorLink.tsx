import type { AnchorHTMLAttributes } from 'react'
import classnames from 'classnames'

const AnchorLink: FCC<AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
	const classList = classnames(props.className)

	return (
		<a {...props} className={classList}>
			{props.children}
		</a>
	)
}

export default AnchorLink
