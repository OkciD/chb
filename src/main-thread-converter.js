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
				const bytesArrayCopy = new Uint8ClampedArray(imageData.data);
				imageData.data.set(convert(bytesArrayCopy));

				ctx.putImageData(imageData, 0, 0);

				resolve(canvas.toDataURL());
			};
			img.src = reader.result;
		};
		reader.readAsDataURL(file);
	})
}

function convert(bytesArray) {
	for (let i = 0; i < bytesArray.length; i += 4) {
		const avg = (bytesArray[i] + bytesArray[i+1] + bytesArray[i+2]) / 3;
		/*                r        +        g        +       b          / 3 (bytesArray[i+3] - это альфа-канал) */
		bytesArray[i] = avg;
		bytesArray[i+1] = avg;
		bytesArray[i+2] = avg;
	}

	return bytesArray;
}
