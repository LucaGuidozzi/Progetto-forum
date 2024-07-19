import React from "react";
import { useState } from "react";

function Account() {
  const [newPassword, setNewPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");

  const handleChangePassword = () => {
    fetch("http://localhost:3000/account", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ userId, newPassword }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Password cambiata con successo");
        } else {
          throw new Error("Errore durante il cambio della password");
        }
      })
      .catch((error) => {
        console.log(
          "Si è verificato un errore durante il cambio password",
          error
        );
      });
    setUserId("");
    setNewPassword("");
  };

  const handleDeleteAccount = () => {
    fetch("http://localhost:3000/account", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Account eliminato con successo");
        } else {
          throw new Error("Errore durante l'eliminazione dell'account");
        }
      })
      .catch((error) => {
        console.log(
          "Si è verificato un errore durante l'eliminazione dell'account",
          error
        );
      });
    setEmail("");
  };
  return (
    <div>
      <h3 className="titolo-account">Cambia Password</h3>
      <input
        type="text"
        placeholder="ID utente"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />

      <input
        type="password"
        value={newPassword}
        placeholder="nuova password"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleChangePassword}>Cambia Password</button>
      <h3>Elimina Account</h3>
      <input
        type="text"
        name="email"
        placeholder="Email utente"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleDeleteAccount}>Elimina Account</button>
    </div>
  );
}

export default Account;
