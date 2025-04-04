import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.TOKEN_KEY; // Usa la misma clave secreta que en el controlador

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ msg: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Agregar los datos del usuario al objeto req
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};