const isAdmin = (req, res, next) => {
    const adminRoles = ['admin', 'super admin'];
    const { role } = req.userData;
    if (adminRoles.includes(role)) {
     return next();
    } else {
      return res.status(403).json({
        message: "Access denied"
      });
    }
  };
  export default isAdmin;
  