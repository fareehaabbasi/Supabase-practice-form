console.log(client);

//--------------- ADD A POST ------------>
console.log("POST JAVASCRIPT")
const submitBtn = document.getElementById('post-Btn');
const loader = document.getElementById("loader-overlay");

function showLoader() {
    loader.style.display = 'flex';
}

function hideLoader() {
    loader.style.display = 'none';
};
submitBtn &&
    submitBtn.addEventListener('click', async () => {
        // event.preventDefault();
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
        submitBtn.disabled = true;
        submitBtn.innerText = "Posting...";

        try {
            const { data: { user }, error: authError, } = await client.auth.getUser();
            if (authError || !user) throw authError || new Error("user not found");
            console.log(user.id);
            const { data, error } = await client.from("post")
                .insert({
                    uid: user.id,
                    title: postTitle,
                    description: postDes,

                })

            if (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Post Failed',
                    text: 'There was a problem creating the post.',
                    confirmButtonColor: '#125b9a',
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Post Created',
                    text: 'Your post has been successfully created!',
                    timer: 1500,
                    showConfirmButton: false,
                });
                document.getElementById('title').value = '';
                document.getElementById('description').value = '';
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Unexpected Error',
                text: 'Something went wrong. Please try again.',
                confirmButtonColor: '#125b9a',
            });
        } finally {
            hideLoader();
            submitBtn.disabled = false;
            submitBtn.innerText = "Post";
        }
    })


// YOUR THOUGHTS
if (window.location.pathname == "/all-thoughts.html") {
    try {
        const readAllThoughts = async () => {
            const { data, error } = await client
                .from('post')
                .select();
            if (data) {
                const box = document.getElementById("container");
                console.log(box)
                box.innerHTML = data.map(({id, title, description}) => {
                    // {console.log(title, description)}
                    // console.log(thoughts)
                    return (
                        `<div id=${id} class="container row d-flex gap-4 m-5 py-5" id="thoughts-list">
                        <div class="col-md-4">
                            <div class="bg-black p-4 rounded h-100">
                                <h5 class="text-warning">${title}</h5>
                                <p>${description}</p>
                                <button class="btn btn-warning btn-sm me-2">Add</button>
                                <button class="btn btn-danger btn-sm">Delete</button>
                            </div>
                        </div>
                    </div>`
                    )
            })
                console.log(data)
            } else {
                console.log(error)
            }
        }
        readAllThoughts()
    } catch (error) {
        console.error(error.message);

    }
}