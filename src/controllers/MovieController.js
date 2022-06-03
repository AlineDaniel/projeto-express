const db = require('../database/models');
const sequelize = db.sequelize;
const bcrypt = require("bcryptjs");
//Outra forma de chamar os models
const Movies = db.Movie;
const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui devemos modificar e completar o necessário para trabalhar com o CRUD
    add: function (req, res) {
        res.render("moviesAdd");
    },
    create: function (req, res) {
        const { title, awards, length, rating, release_date } = req.body;
        db.Movie.create({
            title: title,
            awards: awards,
            length: length,
            rating: rating,
            release_date: release_date
        }).then(() => {
            res.redirect("/movies");
        }).catch(() => {
            res.redirect("/movies/add");
        })
    },
    edit: async function(req, res) {
        const idFilme = req.params;
        const filme = await Movie.findByPk(idFilme);
        res.render("moviesEdit", {
            Movie: filme
        });
    },
    update: function (req,res) {
        // TODO
    },
    delete: function (req, res) {
        // TODO
    },
    destroy: function (req, res) {
        // TODO
    }
}
   module.exports = moviesController;