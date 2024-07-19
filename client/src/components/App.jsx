import React from "react";
import Registrazione from "./Registrazione";
import Login from "./Login";
import Home from "./Home";
import Forum from "./Forum";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Account from "./Account";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <NavBar />

          <Routes>
            <Route path="/registrazione" element={<Registrazione />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
          </Routes>

          <footer>&copy; PROGETTO FORUM CORSO</footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
