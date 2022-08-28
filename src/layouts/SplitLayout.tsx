import type { Metadata } from '@lib/withMetadata'
import classnames from 'classnames'
import MetadataHead from '@components/MetadataHead'

const SplitLayout: FC<Props> = (props) => {
	const leftClassList = classnames('flex-grow', props.leftClassName)
	const rightClassList = classnames('flex-grow', props.rightClassName)

	return (
		<div className="flex h-full">
			<MetadataHead metadata={props.metadata} />
			<div className={leftClassList}>
				{props.leftContent}
			</div>
			<main className={rightClassList}>
				{props.rightContent}
			</main>
		</div>
	)
}

interface Props {
	metadata?: Metadata
  leftClassName?: string
  rightClassName?: string
  leftContent?: JSX.Element
  rightContent?: JSX.Element
}

export default SplitLayout
