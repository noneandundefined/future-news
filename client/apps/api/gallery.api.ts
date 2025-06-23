import { config } from '@/app/config/config.client';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

class GalleryAPI {
	public async get(): Promise<GalleryAPI[]> {
		try {
			const response = await axios.get(
				`${
					config.type.release == 'dev'
						? config.links.URL_BACKEND_DEV
						: config.links.URL_BACKEND_PROD
				}/gallery`,
				{
					withCredentials: true,
				}
			);

			return response.data.message;
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response) {
					toast.error(error.response.data.message);
				} else if (error.request) {
					toast.error('Ошибка при отправки запроса.');
				}
			} else {
				toast.error('Произошла ошибка. Пожалуйста, попробуйте снова.');
			}

			return [];
		}
	}
}

export default new GalleryAPI();
