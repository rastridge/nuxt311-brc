import { smsService } from '~/server/services/smsService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const body = await readBody(event)
		return smsService.addOne(body)
	} else {
		return 'restricted'
	}
})
