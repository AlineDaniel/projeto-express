const db = require('../models');

//Outra forma de chamar os models
const MovieController = {
    index: (req, res) => {
        db.Movies.findAll().then((filmes) => {
                res.render("filmes" , {
                    listafilmes: filmes
            });
        });
    
    }
      
};

module.exports = MovieController;