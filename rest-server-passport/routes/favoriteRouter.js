var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findOne({createdBy:req.decoded._doc._id})
        .populate('createdBy')
        .populate('dishes')
        .exec(function (err, favorite) {
        if (err) return next(err);
        res.json(favorite);
    });
    
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Favorites.findOne({createdBy:req.decoded._doc._id}, function(err, favorite){
        if (err) throw err;
        if (favorite == null){
            Favorites.create({createdBy:req.decoded._doc._id}, function (err, favorite) {
                if (err) throw err;
                
                favorite.dishes.push(req.body._id);
                favorite.save(function (err, favorite) {
                    if (err) return next(err);
                    res.json(favorite);
                });
                //res.end('Added new favorite');
            });
        }
        else {
            favorite.dishes.addToSet(req.body._id);
                favorite.save(function (err, favorite) {
                    if (err) return next(err);
                    res.json(favorite);
                });
                //res.end('Added additional favorite');
        }
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Favorites.findOne({createdBy:req.decoded._doc._id}, function (err, favorite) {
        if (err) throw err;
        favorite.remove();
        res.json(favorite);
    });
});

favoriteRouter.route('/:dishId')
.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.findOne({createdBy:req.decoded._doc._id}, function (err, favorite) {
        if (err) throw err;
        
        var dishIndex = favorite.dishes.indexOf(req.param.dishId);
        favorite.dishes.splice(dishIndex, 1);
        favorite.save(function (err, dish){
            if (err) throw err;
            res.json(dish);
        });
        
        res.json(favorite);
    });
});


module.exports = favoriteRouter;