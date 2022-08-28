import Head from 'next/head'
import { Metadata } from '@lib/withMetadata'
import { publicConfig } from '@config'

const DEFAULT_SITE_TITLE = 'BOILERPLATE'

const MetadataHead: FC<Props> = (props) => {
	const baseUrl = publicConfig.app.url

	if (!props.metadata?.image) {
		props.metadata.image = {
			url: `${baseUrl}/images/social-banner.jpg`,
			width: '2376',
			height: '594',
		}
	}

	return (
		<Head>
			<title>{props.metadata?.title || DEFAULT_SITE_TITLE}</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

			{props.metadata?.version ? (
				<meta name="version" content={props.metadata.version} />
			) : null}

			{/* Open Graph / Facebook Meta */}
			{props.metadata?.url ? (
				<meta name="og:url" property="og:url" content={props.metadata?.url} />
			) : null}
			{props.metadata?.title || DEFAULT_SITE_TITLE ? (
				<>
					<meta name="og:title" property="og:title" content={props.metadata?.title || DEFAULT_SITE_TITLE} />
					<meta name="og:site_name" property="og:site_name" content={props.metadata?.title || DEFAULT_SITE_TITLE} />
				</>
			) : null}
			<meta name="og:type" property="og:type" content={props.metadata?.content || 'website'} />
			{props.metadata?.description ? (
				<>
					<meta name="description" content={props.metadata?.description} />
					<meta name="og:description" property="og:description" content={props.metadata?.description} />
				</>
			) : null}

			{props.metadata?.keywords && Array.isArray(props.metadata?.keywords) && props.metadata?.keywords.length > 0 ? (
				<meta name="keywords" content={props.metadata?.keywords.join(',')} />
			) : null}

			{props.metadata?.image ? (
				<>
					{props.metadata?.image?.url ? (
						<meta name="og:image" property="og:image" content={props.metadata?.image?.url} />
					) : null}
					{props.metadata?.image?.width ? (
						<meta name="og:image:width" property="og:image:width" content={props.metadata?.image?.width} />
					) : null}
					{props.metadata?.image?.height ? (
						<meta name="og:image:height" property="og:image:height" content={props.metadata?.image?.height} />
					) : null}
					{props.metadata?.image?.alt || props.metadata?.title ? (
						<meta name="og:image:alt" property="og:image:alt" content={props.metadata?.image?.alt || props.metadata?.title} />
					) : null}
				</>
			) : null}

			{props.metadata?.content === 'video' && props.metadata?.video?.url ? (
				<>
					{props.metadata?.video?.url ? (
						<meta name="og:video:url" property="og:video:url" content={props.metadata?.video?.url} />
					) : null}
					{props.metadata?.video?.url ? (
						<meta name="og:video:secure_url" property="og:video:secure_url" content={props.metadata?.video?.url} />
					) : null}
					<meta name="og:video:width" property="og:video:width" content={props.metadata?.image.width || '1280'} />
					<meta name="og:video:height" property="og:video:height" content={props.metadata?.image.height || '720'} />
					{props.metadata?.image.url ? (
						<meta name="twitter:image" property="twitter:image" content={props.metadata?.image.url} />
					) : null}
					{props.metadata?.image?.alt || props.metadata?.title ? (
						<meta name="twitter:image" property="twitter:image:alt" content={props.metadata?.image?.alt || props.metadata?.title} />
					) : null}
					<meta name="twitter:card" property="twitter:card" content="player" />
					{props.metadata?.url ? (
						<meta name="twitter:url" property="twitter:url" content={props.metadata?.url} />
					) : null}
					{props.metadata?.video?.title || props.metadata?.title || DEFAULT_SITE_TITLE ? (
						<meta name="twitter:title" property="twitter:title" content={props.metadata?.video?.title || props.metadata?.title || DEFAULT_SITE_TITLE} />
					) : null}
					{props.metadata?.description ? (
						<meta name="twitter:description" property="twitter:description" content={props.metadata?.description} />
					) : null}
					{props.metadata?.video?.url ? (
						<meta name="twitter:player" property="twitter:player" content={props.metadata?.video?.url} />
					) : null}
					<meta name="twitter:player:width" property="twitter:player:width" content={props.metadata?.image?.width || '1280'} />
					<meta name="twitter:player:height" property="twitter:player:height" content={props.metadata?.image?.height || '385'} />
				</>
			) : (
				<>
					<meta name="twitter:card" property="twitter:card" content="summary_large_image" />
					{props.metadata?.image?.url ? (
						<meta name="twitter:image" property="twitter:image" content={props.metadata?.image?.url} />
					) : null}
					{props.metadata?.image?.alt || props.metadata?.title ? (
						<meta name="twitter:image" property="twitter:image:alt" content={props.metadata?.image?.alt || props.metadata?.title} />
					) : null}
					{props.metadata?.url ? (
						<meta name="twitter:url" property="twitter:url" content={props.metadata?.url} />
					) : null}
					{props.metadata?.title || DEFAULT_SITE_TITLE ? (
						<meta name="twitter:title" property="twitter:title" content={props.metadata?.title || DEFAULT_SITE_TITLE} />
					) : null}
					{props.metadata?.description ? (
						<meta name="twitter:description" property="twitter:description" content={props.metadata?.description} />
					) : null}
				</>
			)}
		</Head>
	)
}

interface Props {
  metadata?: Metadata
}

export default MetadataHead
