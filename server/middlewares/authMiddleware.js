import jwt from "jsonwebtoken";

export const verifyJwt = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        erreur: "Token manquant dans l'en-tête Authorization",
        infoType: "400",
      });
    }
    const aToken = req.headers.authorization.split(" ")[1];
    if (!aToken) {
      return res
        .status(400)
        .json({ erreur: "Token non fourni", infoType: "400" });
    }
    const aSecret = process.env.JWT_SECRET;
    const aDecoded = jwt.verify(aToken, aSecret);
    if (aDecoded) {
      req.decoded = aDecoded;
      req.userId = aDecoded.id;
      return next();
    } else {
      return res
        .status(400)
        .json({ erreur: "Échec de la vérification du JWT", infoType: "400" });
    }
  } catch (aErreur) {
    if (aErreur.name === "JsonWebTokenError") {
      return res.status(401).json({ erreur: "JWT invalide", infoType: "401" });
    } else if (aErreur.name === "TokenExpiredError") {
      return res.status(401).json({ erreur: "JWT expiré", infoType: "oldJwt" });
    } else {
      console.error("Erreur serveur lors de la vérification du JWT :", aErreur);
      return res
        .status(500)
        .json({ erreur: "Erreur interne du serveur", infoType: "500" });
    }
  }
};

export const isAdmin = (req, res, next) => {
  try {
    const aDecoded = req.decoded;
    if (!aDecoded || !aDecoded.role) {
      return res.status(403).json({
        erreur: "Accès interdit : rôle utilisateur non défini",
        infoType: "403",
      });
    }
    if (aDecoded.role === "admin") {
      return next();
    } else {
      return res.status(403).json({
        erreur: "Accès interdit : rôle administrateur requis",
        infoType: "403",
      });
    }
  } catch (aErreur) {
    console.error(
      "Erreur lors de la vérification du rôle administrateur :",
      aErreur,
    );
    return res
      .status(500)
      .json({ erreur: "Erreur interne du serveur", infoType: "500" });
  }
};
