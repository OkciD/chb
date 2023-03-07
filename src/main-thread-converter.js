export function mainThreadConverter(file) {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onload = () => {
			const originalBufferView = new Uint8Array(reader.result);
			const blackAndWhiteBufferView = convert(originalBufferView);
			const blob = new Blob( [blackAndWhiteBufferView], {type: 'image/jpeg'});
			resolve(URL.createObjectURL(blob));
		};
		reader.readAsArrayBuffer(file);
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
