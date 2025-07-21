// //--------------- ADD A POST ------------>
const submitBtn = document.getElementById("post-btn");
const loader = document.getElementById("loader-overlay");

function showLoader() {
    loader.style.display = 'flex';
}

function hideLoader() {
    loader.style.display = 'none';
};
submitBtn &&
    submitBtn.addEventListener('click', async () => {
        const postTitle = document.getElementById('title').value.trim();
        const postDes = document.getElementById('description').value.trim();

        if (!postTitle || !postDes) {
            Swal.fire({
				icon: 'warning',
				title: 'Missing Fields',
				text: 'Please enter both a title and a description.',
				confirmButtonColor: '#125b9a',
			});
			return;
      }
      showLoader();
		submitPost.disabled = true;
    })
