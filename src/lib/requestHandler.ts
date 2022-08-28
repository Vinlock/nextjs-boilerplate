import type { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils'
import type { UserProfile } from '@auth0/nextjs-auth0'
import nc from 'next-connect'

export interface ExtendedNextApiRequest extends NextApiRequest {
	user?: UserProfile
}

const requestHandler = () => nc<ExtendedNextApiRequest, NextApiResponse>({
	onError: (err, req, res) => {
		console.error(err.stack)
		res.status(500).end('Something broke!')
	},
	onNoMatch: (req, res) => {
		res.status(405).end('Method not implemented')
	},
})

export default requestHandler
