import { config } from '@/app/config/config.client';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

class UserAPI {
	public async signin(username: string, password: string): Promise<void> {
		try {
			const response = await axios.post(
				`${
					config.type.release == 'dev'
						? config.links.URL_BACKEND_DEV
						: config.links.URL_BACKEND_PROD
				}/auth/signin`,
				{
					login: username,
					password: password,
				},
				{
					withCredentials: true,
				}
			);

			toast.success(response.data.message);
			setTimeout(() => {
				window.location.reload();
			}, 1500);
		} catch (error: any) {
			if (error instanceof AxiosError) {
				if (error.response) {
					toast.error(error.response.data.message);
				} else if (error.request) {
					toast.error('error when sending the request.');
				}
			} else {
				toast.error('an error has occurred. Please try again.');
			}
		}
	}

	public async signup(username: string, password: string): Promise<void> {
		try {
			const response = await axios.post(
				`${
					config.type.release == 'dev'
						? config.links.URL_BACKEND_DEV
						: config.links.URL_BACKEND_PROD
				}/auth/signup`,
				{
					login: username,
					password: password,
				},
				{
					withCredentials: true,
				}
			);

			toast.success(response.data.message);
			setTimeout(() => {
				window.location.href = '/signin';
			}, 1500);
		} catch (error: any) {
			if (error instanceof AxiosError) {
				if (error.response) {
					toast.error(error.response.data.message);
				} else if (error.request) {
					toast.error('error when sending the request.');
				}
			} else {
				toast.error('an error has occurred. Please try again.');
			}
		}
	}
}

export default new UserAPI();
