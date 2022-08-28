import type { NextApiHandler, NextApiRequest } from 'next'
import type { Schema, ValidationErrorItem } from 'joi'
import joi from 'joi'

export interface ValidationSchema {
	body?: Schema | Record<string, Schema> | ((req) => Schema | Record<string, Schema> | Promise<Schema | Record<string, Schema>>)
	query?: Schema | Record<string, Schema> | ((req) => Schema | Record<string, Schema> | Promise<Schema | Record<string, Schema>>)
}

const validateRequest = (schema: ValidationSchema, handler: NextApiHandler): NextApiHandler => {
	return async (req, res) => {
		const evalSchema = async (fn: ((req: NextApiRequest) => Schema | Promise<Schema>) | Schema): Promise<Schema> => {
			if (typeof fn === 'function') {
				return fn(req)
			}
			return fn
		}

		const convertToSchema = (schema: Schema | Record<string, Schema> | ((req) => Schema | Record<string, Schema> | Promise<Schema | Record<string, Schema>>)) => {
			if (joi.isSchema(schema)) {
				return schema
			} else if (schema) {
				return joi.object(schema as Record<string, Schema>)
			}
			return null
		}

		const [bodySchema, querySchema] = await Promise.all([
			evalSchema(convertToSchema(schema.body)),
			evalSchema(convertToSchema(schema.query)),
		])

		const results = await Promise.all([
			schema.body ? validateObject(bodySchema, req.body) : Promise.resolve(null),
			schema.query ? validateObject(querySchema, req.query as { [key: string]: string }) : Promise.resolve(null),
		])

		const [ bodyResult, queryResult ] = results
		if (bodyResult !== null) {
			req.body = bodyResult.value
		}
		if (queryResult !== null) {
			req.query = queryResult.value
		}

		const errorsList = results.reduce((list: string[], result: ValidationResult) => {
			if (result && result.error) {
				if (Array.isArray(result.error.details)) {
					result.error.details.forEach((detail: ValidationErrorItem) => {
						const message = detail.message.split('"').join('\'')
						list.push(message)
					})
				}
			}
			return list
		}, [])

		if (errorsList.length > 0) {
			return res.status(422).send({ error: errorsList[0] })
		}

		return handler(req, res)
	}
}

interface ValidationResult {
	value: unknown
	error: joi.ValidationError | null
}

const validateObject = async (schema: Schema, obj: { [key: string]: string }): Promise<ValidationResult> => {
	const result: ValidationResult = {
		value: null,
		error: null,
	}

	try {
		result.value = await schema.validateAsync(obj)
	} catch (err) {
		result.error = err
	}

	return result
}

export default validateRequest
