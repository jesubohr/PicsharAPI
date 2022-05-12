const helpers = {
    isAuthenticated: (req, res, next) => {
        if(!req.user) res.status(401).json({ msg: 'Not Authenticated' });
        return next();
    }
};

module.exports = helpers;
