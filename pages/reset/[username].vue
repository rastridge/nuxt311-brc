<template>
	<div class="my-form-style">
		<FormKit
			id="password_reset"
			type="form"
			submit-label="Reset password"
			@submit="submitHandler"
		>
			<FormKit
				type="password"
				name="password"
				label="Password"
				validation="required|length:8"
				validation-visibility="live"
				:validation-messages="{
					matches: 'Must be at leat 8 characters',
				}"
			/>
			<FormKit
				type="password"
				name="password_confirm"
				label="Confirm password"
				validation="required|confirm"
				validation-visibility="live"
				validation-label="Confirmation"
			/>
		</FormKit>
	</div>
</template>

<script setup>
	const route = useRoute()
	const username = ref(route.params.username)

	const submitHandler = async (state) => {
		const password = state.password
		await useFetch('/users/resetpassword', {
			method: 'POST',
			body: { username, password },
		})

		navigateTo('/loginpage')
	}
</script>
