import React from "react";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleClick(e) {
    e.preventDefault();
    let userData = {
      email: email,
      password: password,
    };

    fetch("http://localhost:3000/login", {
      method: "GET",
      headers: { "Content-type": "application/json;charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          return (window.location.href = "http://localhost:5173/forum");
        } else {
          return (window.location.href = "http://localhost:5173/login");
        }
      })

      .then((json) => console.log(json));
  }

  return (
    <div className="container-login">
      <form className="Form-login">
        <h3 className="titolo-log">Effettuare il login</h3>
        <label htmlFor="email">Inserire email</label>
        <input
          name="email"
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Inserire password</label>
        <input
          name="password"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registrazione" type="submit" onClick={handleClick}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
