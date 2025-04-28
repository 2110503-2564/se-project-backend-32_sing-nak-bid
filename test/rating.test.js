const { addRating } = require('../src/addRating');
const Restaurant = require('../models/Restaurant');
const mongoose = require('mongoose');

// Mock the Restaurant model
jest.mock('../models/Restaurant');

describe('addRating Controller', () => {
  let req, res, next;
  
  beforeEach(() => {
    // Reset and create fresh mocks for each test
    jest.clearAllMocks();
    
    req = {
      params: {
        RestaurantId: '5f8d0d55b54764421b71635a'
      },
      body: {
        score: 4.5,
        comment: 'Great food and service!'
      },
      user: {
        id: '6001d5f2a5d2c06dde8993b1'
      }
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    next = jest.fn();
  });

  test('should add a rating to a restaurant successfully', async () => {
    // Mock the restaurant object with an array for ratings
    const mockRestaurant = {
      ratings: [],
      save: jest.fn().mockResolvedValue(true)
    };
    
    // Setup the Restaurant.findById mock
    Restaurant.findById.mockResolvedValue(mockRestaurant);
    
    // Call the controller
    await addRating(req, res, next);
    
    // Assertions
    expect(Restaurant.findById).toHaveBeenCalledWith(req.params.RestaurantId);
    
    // Instead of checking if push was called, verify that the rating was added to the array
    expect(mockRestaurant.ratings).toHaveLength(1);
    expect(mockRestaurant.ratings[0]).toEqual({
      user: req.user.id,
      score: req.body.score,
      comment: req.body.comment
    });
    
    expect(mockRestaurant.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: {
        user: req.user.id,
        score: req.body.score,
        comment: req.body.comment
      }
    });
  });

  test('should return 404 if restaurant is not found', async () => {
    // Mock Restaurant.findById to return null (restaurant not found)
    Restaurant.findById.mockResolvedValue(null);
    
    // Call the controller
    await addRating(req, res, next);
    
    // Assertions
    expect(Restaurant.findById).toHaveBeenCalledWith(req.params.RestaurantId);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Restaurant not found'
    });
  });

  test('should handle database errors properly', async () => {
    // Mock Restaurant.findById to throw an error
    const errorMessage = 'Database connection failed';
    Restaurant.findById.mockRejectedValue(new Error(errorMessage));
    
    // Mock console.error to avoid cluttering test output
    console.error = jest.fn();
    
    // Call the controller
    await addRating(req, res, next);
    
    // Assertions
    expect(Restaurant.findById).toHaveBeenCalledWith(req.params.RestaurantId);
    expect(console.error).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Cannot add rating'
    });
  });

  test('should handle restaurant save failure', async () => {
    // Mock the restaurant object with a save method that rejects
    const mockRestaurant = {
      ratings: [],
      save: jest.fn().mockRejectedValue(new Error('Failed to save'))
    };
    
    // Setup the Restaurant.findById mock
    Restaurant.findById.mockResolvedValue(mockRestaurant);
    
    // Mock console.error
    console.error = jest.fn();
    
    // Call the controller
    await addRating(req, res, next);
    
    // Assertions
    expect(Restaurant.findById).toHaveBeenCalledWith(req.params.RestaurantId);
    
    // Verify that a rating was added to the array
    expect(mockRestaurant.ratings).toHaveLength(1);
    
    expect(mockRestaurant.save).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Cannot add rating'
    });
  });

  test('should handle invalid restaurant ID format', async () => {
    // Set an invalid MongoDB ID
    req.params.RestaurantId = 'invalid-id';
    
    // Mock FindById to throw a CastError (which happens with invalid MongoDB IDs)
    const castError = new Error('Cast Error');
    castError.name = 'CastError';
    Restaurant.findById.mockRejectedValue(castError);
    
    // Mock console.error
    console.error = jest.fn();
    
    // Call the controller
    await addRating(req, res, next);
    
    // Assertions
    expect(Restaurant.findById).toHaveBeenCalledWith('invalid-id');
    expect(console.error).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Cannot add rating'
    });
  });
});