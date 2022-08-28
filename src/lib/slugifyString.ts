const slugifyString = (str: string) => {
	return str
		.toString()
		.toLowerCase()
		.normalize('NFD')
		.replace(/\s+/g, '-')
		.replace(/[^\w\-]+/g, '')
		.replace(/--+/g, '-')
}

export default slugifyString
