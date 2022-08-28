import type { User } from '@db'
import type { NextApiRequest, NextApiResponse } from 'next/dist/shared/lib/utils'
import { getSession } from '@auth0/nextjs-auth0'
import prisma from '@db'
import { providerMap } from '@server/utils'

type GetUserFromRequest = {
	(req: NextApiRequest, res: NextApiResponse): Promise<User | null>
	(req: NextApiRequest, res: NextApiResponse, required: true): Promise<User>
	(req: NextApiRequest, res: NextApiResponse, required: false): Promise<User | null>
}

const getUserFromRequest: GetUserFromRequest = async (req: NextApiRequest, res: NextApiResponse, required = true) => {
	const session = getSession(req, res)

	if (required && !session) {
		res.status(401).end()
		return null
	}

	return prisma.user.findFirst({
		where: {
			auth0Providers: {
				some: {
					externalId: session.user.sub,
					provider: providerMap[session.user.sub.split('|')[0]],
				}
			}
		}
	})
}

export default getUserFromRequest
