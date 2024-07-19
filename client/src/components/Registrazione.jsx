import React from "react";
import { useState } from "react";

function Registrazione() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleClick(e) {
    e.preventDefault();
    let userData = {
      nome: nome,
      email: email,
      password: password,
    };

    fetch("http://localhost:3000/registrazione", {
      method: "GET",
      headers: { "Content-type": "application/json;charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    fetch("http://localhost:3000/registrazione", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    window.location.href = "http://localhost:5173/login";
  }

  return (
    <form className="FormRegistrazione">
      <h3 className="titolo-reg">Form di registrazione</h3>
      <label htmlFor="email">Inserire nome</label>
      <input
        name="nome"
        type="text"
        placeholder="nome"
        onChange={(e) => setNome(e.target.value)}
      />
      <label htmlFor="email">Inserire email </label>
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
      <button onClick={handleClick} className="registrazione" type="submit">
        Registrami
      </button>
    </form>
  );
}

export default Registrazione;
