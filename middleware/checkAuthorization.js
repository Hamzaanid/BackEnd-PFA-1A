const jwt = require('jsonwebtoken');

function checkAuthorization(allowedRoles) {
  return function(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Accès non autorisé' });
    }

    try {
      const decodedToken = jwt.verify(token, 'your-secret-key');
      const userRole = decodedToken.role;
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à accéder à cette ressource' });
      }
      req.userId = decodedToken.id;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Accès non autorisé' });
    }
  };
}

module.exports = checkAuthorization;
