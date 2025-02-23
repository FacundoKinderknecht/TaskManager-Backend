import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ error: "Acceso denegado" });

  try {
    const verified = jwt.verify(token.replace("Bearer ", ""), "SECRET_KEY");
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ error: "Token inválido" });
  }
};
