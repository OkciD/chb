const uploadButton = document.querySelector('#upload');

uploadButton?.addEventListener('change', (event) => {
	const [file] = event.target.files;

	renderPreview(file);
});

function renderPreview(file) {
	const previewImg = document.querySelector('#preview');

	const reader = new FileReader();
	reader.onload = () => {
		previewImg.src = reader.result;
	};
	reader.readAsDataURL(file);
}
