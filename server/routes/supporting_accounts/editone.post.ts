import { supportingaccountsService } from '~/server/services/supportingaccountsService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const body = await readBody(event)
		return supportingaccountsService.editOne(body)
	} else {
		return 'restricted'
	}
})
