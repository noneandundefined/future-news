import { config } from '@/app/config/config.client';
import type { Gallery } from '@/app/types/gallery.type';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

class GalleryAPI {
	public async set(file: File): Promise<void> {
		const formData = new FormData();
		formData.append('photo', file);

		try {
			const response = await axios.post(
				`${
					config.type.release == 'dev'
						? config.links.URL_BACKEND_DEV
						: config.links.URL_BACKEND_PROD
				}/gallery`,
				formData,
				{
					headers: { 'Content-Type': 'multipart/form-data' },
					withCredentials: true,
				}
			);

			toast.success(response.data.message);
		} catch (error) {
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

	public async get(): Promise<Gallery[]> {
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
					toast.error('error when sending the request.');
				}
			} else {
				toast.error('an error has occurred. Please try again.');
			}

			return [];
		}
	}

	public async update_select_photo(file: File): Promise<void> {
		const formData = new FormData();
		formData.append('photo', file);

		try {
			const response = await axios.post(
				`${
					config.type.release == 'dev'
						? config.links.URL_BACKEND_DEV
						: config.links.URL_BACKEND_PROD
				}/gallery`,
				formData,
				{
					headers: { 'Content-Type': 'multipart/form-data' },
					withCredentials: true,
				}
			);

			toast.success(response.data.message);
		} catch (error) {
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

export default new GalleryAPI();
