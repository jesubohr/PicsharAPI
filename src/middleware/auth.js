const helpers = {
    isAuthenticated: (req, res, next) => {
        if(!req.user) return res.redirect('/login');
        return next();
    }
};

module.exports = helpers;
