const supabaseUrl = "https://wyyxmzpqfhrjhkzgsmsh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5eXhtenBxZmhyamhremdzbXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0Mzg0ODYsImV4cCI6MjA2NzAxNDQ4Nn0.M4SK79mPcsv_Y5RXxhZZksacI50sZ9Zw1NPeimNvitU";

  const {createClient} = supabase;
  const client = createClient(supabaseUrl, supabaseKey)
  console.log(createClient);

  let userName = document.querySelector("#name");
  let userEmail = document.querySelector("#email");
  let userPass = document.querySelector("#password");
  let btn = document.querySelector("#btn");

  btn.addEventListener("click", function(){
    let getName = userName.value;
    let getEmail = userEmail.value;
    let getPass = userPass.value;

    console.log(getName, getEmail, getPass);
  })


 