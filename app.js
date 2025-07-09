const supabaseUrl = "https://wyyxmzpqfhrjhkzgsmsh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5eXhtenBxZmhyamhremdzbXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0Mzg0ODYsImV4cCI6MjA2NzAxNDQ4Nn0.M4SK79mPcsv_Y5RXxhZZksacI50sZ9Zw1NPeimNvitU"

const { createClient } = supabase;
const client = createClient(supabaseUrl, supabaseKey);
console.log(createClient);
console.log(client);

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
			// alert(error.message || 'Signup failed');
		}
	} else {
		alert('Please fill all fields');
	}
});

	const loginBtn = document.getElementById('login-btn');

	if (loginBtn) {
		loginBtn.addEventListener('click', async (event) => {
			event.preventDefault();

			const emailInput = document.getElementById('login-email');
			const passwordInput = document.getElementById('login-password');

			if (emailInput && passwordInput) {
				const email = emailInput.value.trim();
				const password = passwordInput.value;

				if (!email || !password) {
					alert('Please fill in all fields');
					return;
				}

				try {
					const { data, error } = await client.auth.signInWithPassword({
						email,
						password,
					});

					if (error) {
						if (error.message.includes("Email not confirmed")) {
							alert("Please confirm your email before logging in.");
						} else {
							alert(error.message || 'Login failed');
						}
					} else if (data?.user) {
						// Login success — redirect
						window.location.href = 'home.html';
					}
				} catch (err) {
					console.error('Login error:', err);
					alert('Something went wrong. Please try again.');
				}
			}
		});
    }

// let btn = document.getElementById("signup-btn");

// btn.addEventListener("click", function () {
//   let userEmail = document.getElementById("email");
//   let userPass = document.getElementById("password");

//   if (userEmail && userPass) {
//     console.log(userEmail.value, userPass.value);

//     async function signupUser() {
//       try {
//         const { data, error } = await client.auth.signUp({
//           email: userEmail.value,
//           password: userPass.value,
//         });

//         if (error) throw error
//         console.log(data)
//       }
//       catch (error) {
//         console.log(error);
//         console.log(error.message);
        

//         switch (error.message) {
//           case "Unable to validate email address: invalid format":
//             console.log("hello")
//             alert("please give us the right format of email address");
//             break;
//         }
//       }

//     }
//     signupUser();
//   }else {
//     alert("Please fill the input")
//   }

// });


//--------------- My code------------------
// // const supabaseUrl = "https://wyyxmzpqfhrjhkzgsmsh.supabase.co";
// // const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5eXhtenBxZmhyamhremdzbXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0Mzg0ODYsImV4cCI6MjA2NzAxNDQ4Nn0.M4SK79mPcsv_Y5RXxhZZksacI50sZ9Zw1NPeimNvitU";

// // const client = supabase.createClient(supabaseUrl, supabaseKey);

// // document.querySelector("#btn").addEventListener("click", function () {
// //   const email = document.getElementById("email").value.trim();
// //   const password = document.getElementById("password").value.trim();

// //   if (!email || !password) {
// //     alert("Please fill both fields");
// //     return;
// //   }

// //   async function signupUser() {
// //     try {
// //       const { data, error } = await client.auth.signUp({
// //         email,
// //         password,
// //       });

// //       if (error) throw error;

// //       console.log("Signup success:", data);
// //       alert("Signup successful!");

// //     } catch (error) {
// //       console.log("Signup error:", error.message);
// //       if (error.message.includes("invalid format")) {
// //         alert("Please enter a valid email address");
// //       } else {
// //         alert("Signup failed: " + error.message);
// //       }
// //     }
// //   }

// //   signupUser();
// // });




// debugger
// const supabaseUrl = "https://wyyxmzpqfhrjhkzgsmsh.supabase.co";
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5eXhtenBxZmhyamhremdzbXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0Mzg0ODYsImV4cCI6MjA2NzAxNDQ4Nn0.M4SK79mPcsv_Y5RXxhZZksacI50sZ9Zw1NPeimNvitU"

// const { createClient } = supabase;
// const client = createClient(supabaseUrl, supabaseKey);
// console.log(createClient);
// console.log(client);

// let btn = document.getElementById("signup-btn");

// btn.addEventListener("click", function () {
//   let userEmail = document.getElementById("email");
//   let userPass = document.getElementById("password");

//   if (userEmail && userPass) {
//     console.log(userEmail.value, userPass.value);

//     async function signupUser() {
//       try {
//         const { data, error } = await client.auth.signUp({
//           email: userEmail.value,
//           password: userPass.value,
//         });

//         if (error) throw error
//         console.log(data)
//       }
//       catch (error) {
//         console.log(error);
//         console.log(error.message);
        

//         switch (error.message) {
//           case "Unable to validate email address: invalid format":
//             console.log("hello")
//             alert("please give us the right format of email address");
//             break;
//         }
//       }

//     }
//     signupUser();
//   }else {
//     alert("Please fill the input")
//   }

// });


//--------------- My code------------------
// // const supabaseUrl = "https://wyyxmzpqfhrjhkzgsmsh.supabase.co";
// // const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5eXhtenBxZmhyamhremdzbXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0Mzg0ODYsImV4cCI6MjA2NzAxNDQ4Nn0.M4SK79mPcsv_Y5RXxhZZksacI50sZ9Zw1NPeimNvitU";

// // const client = supabase.createClient(supabaseUrl, supabaseKey);

// // document.querySelector("#btn").addEventListener("click", function () {
// //   const email = document.getElementById("email").value.trim();
// //   const password = document.getElementById("password").value.trim();

// //   if (!email || !password) {
// //     alert("Please fill both fields");
// //     return;
// //   }

// //   async function signupUser() {
// //     try {
// //       const { data, error } = await client.auth.signUp({
// //         email,
// //         password,
// //       });

// //       if (error) throw error;

// //       console.log("Signup success:", data);
// //       alert("Signup successful!");

// //     } catch (error) {
// //       console.log("Signup error:", error.message);
// //       if (error.message.includes("invalid format")) {
// //         alert("Please enter a valid email address");
// //       } else {
// //         alert("Signup failed: " + error.message);
// //       }
// //     }
// //   }

// //   signupUser();
// // });

