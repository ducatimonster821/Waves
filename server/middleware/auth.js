const {User} = require('./../models/user');

let auth = (req, res, next) => {
    let token = req.cookies.w_auth;

    console.log('cookies:', req.cookies);
    console.log('token:', token);

    // TODO: don't working my code with cookie
    token = 'eyJhbGciOiJIUzI1NiJ9.NWQwMDdmMjFlNDBkNGYyYTU0OWExZjkz.kkIYkmycCkPSaSJ72udBgzn22kDWIAi21qQdI_0s-XA';

    User.findByToken(token, (err, user) => {
        if (err) throw err;

        if (!user) {
            return res.json({
                isAuth: false,
                error: true
            });
        }

        req.token = token;
        req.user = user;

        next();
    });
};

module.exports = {auth};

