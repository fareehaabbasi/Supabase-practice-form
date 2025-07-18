const supabaseUrl = "https://wyyxmzpqfhrjhkzgsmsh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5eXhtenBxZmhyamhremdzbXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0Mzg0ODYsImV4cCI6MjA2NzAxNDQ4Nn0.M4SK79mPcsv_Y5RXxhZZksacI50sZ9Zw1NPeimNvitU"

const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);
console.log(createClient);
console.log(client);

// -------- User Profile --------
async function userProfile() {
	try {
		const { data: { user }, error, } = await client.auth.getUser();
		console.log("USER:", user);
		console.log("ERROR:", error);
		if (error) throw error;

		if (user) {
			console.log("User is logged in!");

			if (document.getElementById('profile-avatar')) {
				document.getElementById('profile-avatar').src = user.user_metadata?.avatar_url || 'https://www.gravatar.com/avatar/?d=mp';
				document.getElementById('profile-name').textContent = user.user_metadata?.full_name || user.email;
				document.getElementById('profile-email').textContent = user.email;
			}
			if (window.location.pathname.includes('index.html')) {
				window.location.href = 'home.html';
			}
		} else {
			console.log("User not found, redirecting...");
			if (!window.location.pathname.includes('index.html') && !window.location.pathname.includes('login.html')) {
				window.location.href = 'index.html';
			}
		}
	} catch (error) {
		console.error("Error", error);
		if (!window.location.pathname.includes('index.html') && !window.location.pathname.includes('login.html')) {
			window.location.href = 'index.html';
		}
	}
}

// -------- Log In with google ---------
const LoginWithGoogle = document.getElementById("login-google");
LoginWithGoogle && LoginWithGoogle.addEventListener('click', async () => {
	try {
		const { error } = await client.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: window.location.origin + '/home.html',
				redirectTo: 'https://fareehaabbasi.github.io/Supabase-practice-form/',
				queryParams: { access_type: 'offline', prompt: 'consent' },
			},
		})
		if (error) throw error;
	} catch (error) {
		console.error('Google login error:', error);
		alert(error.message || 'Google login failed');
	}
});

// Check for returning Google OAuth redirect
document.addEventListener('DOMContentLoaded', async () => {
	if (window.location.hash.includes('access_token')) {
		const {
			data: { session },
		} = await client.auth.getSession();
		if (session) window.location.href = 'home.html';
	}
	if (!window.location.pathname.includes('index.html') && !window.location.pathname.includes('login.html')) {
		userProfile();
	}
});

// -------- Log out --------
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn &&
logoutBtn.addEventListener('click', async () => {
	try {
		const { error } = await client.auth.signOut();
		if (error) throw error;
		window.location.href = 'index.html';
	}catch (error) {
		console.error("Error", error);
		alert("Failed logout");
	}
})

// ------- Toggle eye button ---------
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("signup-password") ||
  document.getElementById("login-password");;
const eyeIcon = document.getElementById("eyeIcon");

togglePassword.addEventListener('click', () =>  {
	const type = passwordInput.type === "password" ? "text" : "password";
	passwordInput.type = type;

	// Icon change
	if (type === "text") {
		eyeIcon.classList.remove("fa-eye");
		eyeIcon.classList.add("fa-eye-slash");
	} else {
		eyeIcon.classList.remove("fa-eye-slash");
		eyeIcon.classList.add("fa-eye");
	}
})


// -------- SignUp -----------
const signupBtn = document.getElementById('signup-btn');
signupBtn &&
	signupBtn.addEventListener('click', async (event) => {
		event.preventDefault();

		const email = document.getElementById('signup-email');
		const password = document.getElementById('signup-password');

		if (email && password) {
			try {
				const { data, error } = await client.auth.signUp({
					email: email.value,
					password: password.value,
				});

				if (error) {
					throw error; // ❗ Alert tabhi chalega agar real error ho
				} else if (data?.user) {
					window.location.href = 'login.html';
				}
			} catch (error) {
				console.error('Signup error:', error);
				if (email.value === "" || password.value === "") {
					alert("please fill all fields")
				}else {
					alert("You are already registered");
				}
				// alert(error.message || 'Signup failed');
			}
		} else {
			alert('Please fill all fields');
		}
	});


// -------- Log In ----------
const loginBtn = document.getElementById('login-btn');
loginBtn &&
	loginBtn.addEventListener('click', async (event) => {
		event.preventDefault();

		const email = document.getElementById('login-email');
		const password = document.getElementById('login-password');

		if (email && password) {
			try {
				const { data, error } = await client.auth.signInWithPassword({
					email: email.value,
					password: password.value,
				});

				if (error) {
					throw error; // ❗ Alert tabhi chalega agar real error ho
				} else if (data?.user) {
					window.location.href = 'home.html';
				}
			} catch (error) {
				console.error('Login error:', error);
				if (email.value === "" || password.value === "") {
					alert("please fill all fields")
				}else {
					alert("Please enter a valid email OR password");
				}
				// alert(error.message || 'Signup failed');
			}
		} else {
			alert('Please fill all fields');
		}
	});



//--------------- ADD A POST ------------>
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