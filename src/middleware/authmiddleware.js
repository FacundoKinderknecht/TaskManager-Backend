import jwt from "jsonwebtoken";

const token = req.headers["authorization"];

console.log("🔍 Token recibido en Render:", token);  // 🔴 Verifica si llega el token

if (!token) {
  console.error("❌ No se recibió ningún token.");
  return res.status(401).json({ message: "Acceso denegado. No hay token." });
}

try {
  const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
  console.log("✅ Token decodificado correctamente:", decoded);
  req.user = decoded;
  next();
} catch (error) {
  console.error("❌ Error en verificación del token:", error.message);
  return res.status(401).json({ message: "Token inválido." });
}

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Acceso denegado. No hay token." });
    }

    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Token no válido" });
    }
};

export default verifyToken;

