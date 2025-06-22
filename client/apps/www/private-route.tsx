export function getAuthState() {
	return document.cookie
		.split(';')
		.some((item) => item.trim().startsWith('auth-token='));
}
