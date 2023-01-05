const { default: axios } = require("axios");

const signIn = async (name, email, password) => {
  // e.preventDefault();
  console.log(name, email, password);
  try {
    const data = {
      name,
      email,
      password,
    };

    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:2100/api/v1/users/register",
      data: {
        name,
        email,
        password,
      },
    });
    // const rawResponse = await fetch(
    //   "http://127.0.0.1:2100/api/v1/users/register",
    //   {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   }
    // );
    // console.log(rawResponse);
    // const res = await rawResponse.json();

    console.log("We here");
    console.log("Data", res.data);
    console.log("Full res", res);
  } catch (err) {
    console.log("ERROR", err);
  }
};

document.querySelector(".sign-up-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signIn(e, name, email, password);
});
