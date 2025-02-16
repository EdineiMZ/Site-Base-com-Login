// src/middlewares/permissionMiddleware.js
module.exports = (requiredRole) => {
    return (req, res, next) => {
        if (req.session.user && req.session.user.role >= requiredRole && req.session.user.active) {
            return next();
        }
        req.flash('error_msg', 'Você não tem permissão para acessar esta página.');
        return res.redirect('/');
    };
};
