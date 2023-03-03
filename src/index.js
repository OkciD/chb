const uploadButton = document.querySelector('#upload');

uploadButton?.addEventListener('change', (event) => {
	const [file] = event.target.files;
	alert(file.name);
});
