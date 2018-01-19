// Requiring Modules
const express = require('express');
const router = express.Router();

// Use Food Controller
let massController = require('../controllers/mass.js');

// Home Route
router.get('/', massController.getLanding);

router.get('/home', massController.goHome);

router.get('/eat', massController.eat);

// Route to search food from Nutrionix
router.post('/search-api-food', massController.searchNutritionAPI);

// Route to create new food from Nutrionix API call
router.post('/save-food', massController.saveAPIFood);

// Route to create new Custom Food
router.post('/create-custom-food', massController.createCustomFood);

// Route to search foods in user's database
router.post('/search-my-food-database', massController.searchMyFoods);

// Route to list ALL Foods from Database
router.get('/list-all-foods', massController.listAllFoods);

// Route to get api info
router.post('/api', massController.getAPIData);

// UPDATE ROUTE
router.put('/update-food/:id', massController.updateFood);

// DELETE ROUTE
router.delete('/delete-food/:id', massController.deleteFood);

// GET: Route to signup page
router.get('/signup', massController.getSignUp);
// POST: Route to signup page
router.post('/signup', massController.postSignUp);

// GET: Route to signup page
router.get('/signin', massController.getSignIn);
// POST: Route to signin page
router.post('/signin', massController.postSignIn);

// Route to LOGOUT
router.get('/logout', massController.logout);

// Route to congratulations page
router.get('/congratulations', massController.congratulations);

// Catch all route
router.get('*', massController.catchAll);

module.exports = router;