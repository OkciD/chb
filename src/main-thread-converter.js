export function mainThreadConverter(file) {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onload = () => {
			const img = new Image();
			img.onload = () => {
				const canvas = document.createElement('canvas');
				canvas.width = img.width;
				canvas.height = img.height;
				const ctx = canvas.getContext('2d');
				ctx.drawImage(img,0,0);

				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				console.log(imageData);
			};
			img.src = reader.result;
		};
		reader.readAsDataURL(file);
	})
}

function convert(imgData) {
	for (let i = 0; i < imgData.length; i += 3) {
		const avg = (imgData[i] + imgData[i+1] + imgData[i+2]) / 3;
		/*              r     +      g      +       b          / 3 */
		imgData[i] = avg;
		imgData[i+1] = avg;
		imgData[i+2] = avg;
	}

	return imgData;
}
