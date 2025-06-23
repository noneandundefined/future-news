export interface Gallery {
	id: number;
	created_at: string;
	updated_at: string;
	user_uuid: string;
	content: string; // base64-строка
	name: string;
	format: string; // например: "jpg", "png", "webp"
}
