import express from "express";
import db from "../utils/db.js";
import { MongoClient } from "mongodb";

const router = express.Router();

//REGISTRAZIONE

router.get("/registrazione", (req, res) => {
  res.json("pagina registrazione");
});

router.post("/registrazione", async (req, res) => {
  const { nome, email, password } = req.body;
  const user = { nome, email, password };

  const ris = await db.user.insertOne(user);
  console.log(ris);

  res.json({ message: "form submitted" });
});

//LOGIN

router.get("/login", (req, res) => {
  res.json("pagina di login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = await db.user.findOne({ email });

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Assicurati di inserire email e password" });
  }

  if (!users) {
    return res.status(404).json({ error: "Utente non trovato" });
  }

  if (users.password === password) {
    res.json("ok");
  } else {
    res.status(401).json({ error: "La password non è corretta" });
  }
  console.log(password);
  console.log(users);
});

//FORUM

router.get("/forum", (req, res) => {
  res.json("pagina forum");
});

//ACCOUNT
//Cambia Password
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017");
mongoClient.connect();

router.put("/account", async (req, res) => {
  const { userId, newPassword } = req.body;
  console.log(req.body);

  try {
    db.forum = mongoClient.db("forum");
    db.user = db.forum.collection("user");
    const result = await db.user.updateOne(
      {
        nome: userId,
      },

      { $set: { password: newPassword } }
    );
    console.log(userId);
    if (result.modifiedCount === 1) {
      console.log("Password dell'utente aggiornata con successo ");
      res.sendStatus(204);
    } else {
      throw new error("Nessun documento utente aggiornato");
    }
  } catch {
    console.log("Errore durante l'aggiornamento della password");
    res.status(500).json({ error: "Errore durante il cambio password" });
  }
});

//Elimina Account

router.delete("/account", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    db.forum = mongoClient.db("forum");
    db.user = db.forum.collection("user");
    const result = await db.user.deleteOne({ email: email });
    console.log(result);
    if (result.deletedCount === 1) {
      console.log("Account eliminato con successo ");
      res.sendStatus(200);
    } else {
      throw new error("Nessun documento utente aggiornato");
    }
  } catch {
    console.log("Errore durante l' eliminazione dell'account");
    res
      .status(500)
      .json({ error: "Errore durante l'eliminazione dell'account" });
  }
});

export default router;
