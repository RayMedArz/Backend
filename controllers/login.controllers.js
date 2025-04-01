import db from "../utils/firebase.js";
import { encryptPassword, verifyPassword } from "../utils/hashing.js";

export const login = async (req, res) => {
  const { password } = req.body;
  const { salt, hash } = encryptPassword(password);

  const user = await db.collection("Users").add({
    ...req.body,
    password: hash,
    salt,
  });

  res.json({ id: user.id, email: req.body.email });
};

export const checkPassword = async (req, res) => {
  const { email, password } = req.query;

  const users = await db.collection("Users").where("email", "==", email).get();

  if (users.empty) {
    return res.status(404).json({ msg: "User not found" });
  }

  const user = users.docs[0].data();
  const isValid = verifyPassword(password, user.salt, user.password);

  res.json({ isValid });
};