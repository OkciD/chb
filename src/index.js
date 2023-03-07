import {getPreview} from './preview.js';

const uploadButton = document.querySelector('#upload');

uploadButton?.addEventListener('change', (event) => {
	const [file] = event.target.files;

	getPreview(file)
		.then((dataUrl) => renderBase64(dataUrl, 'preview'));
});

function renderBase64(dataUrl, imgId) {
	const img = document.getElementById(imgId);
	img.src = dataUrl;
}
