import type { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { ParsedUrlQuery } from 'querystring'
import isPlainObject from 'lodash/isPlainObject'

export interface Metadata {
  title?: string
  description?: string
  keywords?: string[]
  url?: string
	baseUrl?: string
  siteName?: string
  content?: 'website' | 'video'
  image?: {
    url?: string
    width?: string
    height?: string
    alt?: string // Uses title if not filled
  }
  video?: {
    url?: string
    title?: string
  }
  version?: string
}

function withMetadata<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  >(fn?: GetServerSideProps<P, Q>)
function withMetadata<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  >(metadata: Metadata, fn?: GetServerSideProps<P, Q>)
function withMetadata<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  >(arg1?: unknown, arg2?: unknown) {
	let metadata: Metadata
	let fn: GetServerSideProps<P, Q>

	if (isPlainObject(arg1)) {
		metadata = arg1
	} else if (isPlainObject(arg2)) {
		metadata = arg2
	}

	if (typeof arg1 === 'function' || arg1?.constructor?.name === 'AsyncFunction') {
		fn = arg1 as GetServerSideProps<P, Q>
	} else if (typeof arg2 === 'function' || arg2?.constructor?.name === 'AsyncFunction') {
		fn = arg2 as GetServerSideProps<P, Q>
	}

	const mergePropsWithMetadata = (result: GetServerSidePropsResult<P>, metadata: Metadata) => {
		if (result && 'props' in result) {
			return {
				props: Object.assign({}, result.props, { metadata }),
			}
		}

		return Object.assign(result, { props: { metadata } })
	}

	if (!metadata) {
		metadata = {}
	}

	return async function (context: GetServerSidePropsContext<Q>) {
		const protocol = process.env.NODE_ENV === 'production' ? 'https://' : 'http://'
		const host = context.req.headers.host
		const path = context.resolvedUrl
		metadata.url = `${protocol}${host}${path}`

		if (fn) {
			const returnValue = await fn(context)
			return mergePropsWithMetadata(returnValue, metadata)
		}

		return { props: { metadata } }
	}
}

export interface WithMetadataProps {
  metadata: Metadata
}

export default withMetadata
