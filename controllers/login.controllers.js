import db from "../utils/firebase.js";
import { encryptPassword, verifyPassword } from "../utils/hashing.js";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.TOKEN_KEY; // Cambia esto por una clave secreta segura

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Buscar al usuario por email
  const users = await db.collection("Users").where("email", "==", email).get();

  if (users.empty) {
    return res.status(404).json({ msg: "User not found" });
  }

  const user = users.docs[0].data();

  // Verificar la contraseña
  const isValid = verifyPassword(password, user.salt, user.password);
  if (!isValid) {
    return res.status(401).json({ msg: "Invalid credentials" });
  }

  // Generar un token JWT
  const token = jwt.sign({ id: users.docs[0].id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h", // El token expira en 1 hora
  });

  res.json({ token });
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

export const register = async (req, res) => {
  const { email, password } = req.body;

  // Verificar si el usuario ya existe
  const existingUsers = await db.collection("Users").where("email", "==", email).get();
  if (!existingUsers.empty) {
    return res.status(400).json({ msg: "User already exists" });
  }

  // Hashear la contraseña
  const { salt, hash } = encryptPassword(password);

  // Crear el nuevo usuario
  const newUser = {
    email,
    salt,
    password: hash, // Guardar el hash de la contraseña
    createdAt: new Date().toISOString(),
  };

  // Guardar el usuario en la base de datos
  await db.collection("Users").add(newUser);

  res.status(201).json({ msg: "User registered successfully" });
};