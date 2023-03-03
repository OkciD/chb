const uploadButton = document.querySelector('#upload');
const previewImg = document.querySelector('#preview');

uploadButton?.addEventListener('change', (event) => {
	const [file] = event.target.files;

	const reader = new FileReader();
	reader.onload = () => {
		previewImg.src = reader.result;
	};
	reader.readAsDataURL(file);
});
