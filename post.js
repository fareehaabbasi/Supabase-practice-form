console.log(client);

//--------------- ADD A POST ------------>
console.log("POST JAVASCRIPT")
const submitBtn = document.getElementById('post-Btn');
const loader = document.getElementById("loader-overlay");

function showLoader() {
    loader.style.display = 'flex';
};

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
                    user_id: user.id,
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


// All THOUGHTS
if (window.location.pathname == "/all-thoughts.html") {
    try {
        const readAllThoughts = async () => {
            const { data, error } = await client
                .from('post')
                .select();
            if (data) {
                const box = document.getElementById("container");
                console.log(box)
                box.innerHTML = data.map(({ id, title, description }) => {
                    return `
              <div id=${id} class="col-lg-4 col-md-6 col-sm-12">
                <div class="bg-black p-4 rounded h-100 shadow">
                  <h5 class="text-warning">${title}</h5>
                  <p>${description}</p>
                </div>
              </div>`;
                }).join("");
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


// MY THOUGHTS
const readMYThoughts = async () => {
    const { data: { user }, } = await client.auth.getUser();
    const { data, error } = await client
        .from('post')
        .select()
        .eq('user_id', user.id)
    console.log("User ID:", user.id);
    console.log("Fetched data:", data);

    if (data) {
        const box = document.getElementById('container');
        console.log(box)
        box.innerHTML = data.map(({ id, title, description }) => {
            return `
              <div id=${id} class="col-lg-4 col-md-6 col-sm-12">
                <div class="bg-black p-4 rounded h-100 shadow">
                  <h5 class="text-warning">${title}</h5>
                  <p>${description}</p>
                  <button class="btn btn-warning btn-sm me-2" onclick= "updatePost('${id}', '${title}', '${description}')">Edit</button>
                  <button class="btn btn-danger btn-sm" onclick="deletePost('${id}')">Delete</button>
                </div>
              </div>`;
        }).join("");
        console.log(data)
    } else {
        console.log(error)
    }
}

if (window.location.pathname == "/your-thought.html") {
    try {
        readMYThoughts();
    } catch (error) {
        console.log(error.message);

    }
}


//DELETE A POST
async function deletePost(postId) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
        if (result.isConfirmed) {
            try {
        showLoader();
        const { data, error } = await client
            .from('post')
            .delete()
            .eq('id', postId)
        if (error) {
            console.error(error);
        } else {
            hideLoader();
            console.log(data);
            readMYThoughts();
        }
    } catch (error) {
        console.log(error.message);
    } finally {
        hideLoader();
    }

            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });


    
}


//UPDATE A POST
async function updatePost(postId, postTitle, postDescription) {
    const { value: formValues } = await Swal.fire({
        title: "Update Post",
        html: `
    <label> Your Name
    <input id="swal-input1" class="swal2-input" value = '${postTitle}'></label>
    <label> Your Thought
    <input id="swal-input2" class="swal2-input" value = '${postDescription}'></label>
  `,
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById("swal-input1").value,
                document.getElementById("swal-input2").value
            ];
        }
    });

    try {
        if (formValues) {
            showLoader();
            const [updatedTitle, updatedDescription] = formValues;
            const { error } = await client
                .from('post')
                .update({ title: updatedTitle, description: updatedDescription })
                .eq('id', postId)

            if (error) {
                console.error('Error updating post:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: 'There was a problem updating the post.',
                    confirmButtonColor: '#125b9a',
                });
            } else {
                hideLoader();
                Swal.fire({
                    icon: 'success',
                    title: 'Post Updated',
                    text: 'Your post has been successfully updated!',
                    confirmButtonColor: '#125b9a',
                });
                readMYThoughts(); // Refresh the list after update
            }
        }
    } catch (err) {
        console.error('Error updating post:', err);
    } finally {
        hideLoader();
    }
}


