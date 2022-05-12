export class ImageUtils {
	public static getBgImageUrl = (img?: string) => {
		return img ? `url(${img})` : undefined;
	}
}