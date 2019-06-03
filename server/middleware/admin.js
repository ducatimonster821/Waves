let admin = (req, res, next) => {
    console.log(req.user);

    if (req.user.role === 0) {
        return res.send('you are not allowed, get out now.');
    }

    next();
};

module.exports = {admin};

