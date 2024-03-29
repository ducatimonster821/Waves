const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors());
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

// Models ------------------------------------
const {User} = require('./models/user');
const {Brand} = require('./models/brand');
const {Wood} = require('./models/wood');
const {Product} = require('./models/product');

// Middleware ------------------------------------
const {auth} = require('./middleware/auth');
const {admin} = require('./middleware/admin');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// --------------------------------------------
// PRODUCTS
// --------------------------------------------

app.post('/api/product/shop', (req, res) => {
    console.log('/api/product/shop');

    console.log(req.body);

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                console.log(req.body.filters[key][0]);
                console.log(req.body.filters[key][1]);

                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    findArgs['publish'] = true;

    Product
        .find(findArgs)
        .populate('brand')
        .populate('wood')
        .sort([[sortBy, order]])
        .skip(skip).limit(limit)
        .exec((err, articles) => {
            if (err) return res.status(400).send(err);

            res.status(200).json({
                size: articles.length,
                articles
            })
        })
});

// BY ARRIVAL
// /articles?sortBy=createdAt&order=desc&limit=4

// BY SELL
// /articles?sortBy=sold&order=desc&limit=100&skip=5
app.get('/api/product/articles', (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';

    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';

    let limit = req.query.limit ? parseInt(req.query.limit) : 100;

    // console.log('order:', order); // desc
    // console.log('sortBy:', sortBy); // createdAt
    // console.log('limit:', limit); // 4

    Product.find()
        .populate('brand')
        .populate('wood')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, articles) => {
            if (err) {
                return res.status(400).send(err);
            }
            res.send(articles);
        });
});


/// /api/product/article?id=HSHSHSKSK,JSJSJSJS,SDSDHHSHDS,JSJJSDJ&type=single
app.get('/api/product/articles_by_id', (req, res) => {
    let type = req.query.type;
    let items = req.query.id;

    if (type === 'array') {
        let ids = req.query.id.split(',');

        items = [];

        items = ids.map(item => {
            return mongoose.Types.ObjectId(item);
        });
    }

    Product.find({_id: {$in: items}})
        .populate('brand')
        .populate('wood')
        .exec((err, docs) => {
            return res.status(200).send(docs);
        });
});


app.post('/api/product/article', auth, admin, (req, res) => {
    const product = new Product(req.body);

    product.save((err, doc) => {
        if (err) {
            return res.json({
                success: false,
                err
            })
        }

        res.status(200).json({
            success: true,
            article: doc
        });
    });
});

// WOODS --------------------------------------------------
app.post('/api/product/wood/', auth, admin, (req, res) => {
    const wood = new Wood(req.body);

    wood.save((err, doc) => {
        if (err) {
            return res.json({success: false, err});
        }

        res.status(200).json({
            success: true,
            wood: doc
        });
    });
});

app.get('/api/product/woods', (req, res) => {
    Wood.find({}, (err, woods) => {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(woods);
    });
});

// BRAND ----------------------------------------
app.post('/api/product/brand', auth, admin, (req, res) => {
    const brand = new Brand(req.body);

    brand.save((err, doc) => {
        if (err) {
            return res.json({
                success: false,
                err
            })
        }

        res.status(200).json({
            success: true,
            brand: doc
        });
    })
});

app.get('/api/product/brands', (req, res) => {
    // console.log('/api/product/brands');

    Brand.find({}, (err, brands) => {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(brands);
    })
});

// USERS ------------------------------------

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        // user: req.user

        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        cart: req.user.cart,
        history: req.user.history
    });
});

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) {
            return res.json({
                success, err
            });
        }

        res.status(200).json({
            success: true
            // userdata: doc.name
        });
    });
});

app.post('/api/users/login', (req, res) => {
    // console.log('/api/users/login');

    User.findOne({email: req.body.email}, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: 'Auth failed, email not found'
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.json({
                    loginSuccess: false,
                    message: 'Wrong password'
                });
            }

            user.generateToken((err, user) => {

                if (err) {
                    return res.status(400).send(err);
                }

                console.log('user.token:', user.token);

                res
                    .cookie('w_auth', user.token)
                    .status(200)
                    .json({
                        loginSuccess: true
                    });
            });
        });
    });
});

app.get('/api/users/logout', auth, (req, res) => {
    // console.log(req.user);

    User.findOneAndUpdate({_id: req.user._id}, {token: ''}, (err, doc) => {
        if (err) {
            return res.json({success: false, err});
        }

        return res.status(200).send({
            success: true
        });
    });
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server Running at ${port}`);
});
