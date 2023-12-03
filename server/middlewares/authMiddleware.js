import jwt from "jsonwebtoken";

export const verifyJwt = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    if (decoded) {
      req.decoded = decoded;
      req.nationId = decoded.id;
      next();
    } else {
      res.status(400).json({ error });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.decoded.role === "admin") {
    next();
  } else {
    res.status(400).json({
      erreur: "vous n'avez pas les droits d'administration",
    });
  }
};
