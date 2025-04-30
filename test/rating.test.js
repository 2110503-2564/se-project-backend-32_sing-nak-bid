const { addRating } = require("../src/addRating");
const Restaurant = require("../models/Restaurant");
const mongoose = require("mongoose");

jest.mock("../models/Restaurant");

describe("addRating Controller", () => {
  let req, res, next;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      params: {
        RestaurantId: "5f8d0d55b54764421b71635a",
      },
      body: {
        score: 4.5,
        comment: "Great food and service!",
      },
      user: {
        id: "6001d5f2a5d2c06dde8993b1",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  test("should add a rating to a restaurant successfully", async () => {
    const mockRestaurant = {
      ratings: [],
      save: jest.fn().mockResolvedValue(true),
    };

    Restaurant.findById.mockResolvedValue(mockRestaurant);

    await addRating(req, res, next);

    expect(Restaurant.findById).toHaveBeenCalledWith(req.params.RestaurantId);

    expect(mockRestaurant.ratings).toHaveLength(1);
    expect(mockRestaurant.ratings[0]).toEqual({
      user: req.user.id,
      score: req.body.score,
      comment: req.body.comment,
    });

    expect(mockRestaurant.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: {
        user: req.user.id,
        score: req.body.score,
        comment: req.body.comment,
      },
    });
  });

  test("should return 404 if restaurant is not found", async () => {
    Restaurant.findById.mockResolvedValue(null);

    await addRating(req, res, next);

    expect(Restaurant.findById).toHaveBeenCalledWith(req.params.RestaurantId);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Restaurant not found",
    });
  });

  test("should handle database errors properly", async () => {
    const errorMessage = "Database connection failed";
    Restaurant.findById.mockRejectedValue(new Error(errorMessage));

    console.error = jest.fn();

    await addRating(req, res, next);

    expect(Restaurant.findById).toHaveBeenCalledWith(req.params.RestaurantId);
    expect(console.error).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Cannot add rating",
    });
  });

  test("should handle restaurant save failure", async () => {
    const mockRestaurant = {
      ratings: [],
      save: jest.fn().mockRejectedValue(new Error("Failed to save")),
    };

    Restaurant.findById.mockResolvedValue(mockRestaurant);

    console.error = jest.fn();

    await addRating(req, res, next);

    expect(Restaurant.findById).toHaveBeenCalledWith(req.params.RestaurantId);

    expect(mockRestaurant.ratings).toHaveLength(1);

    expect(mockRestaurant.save).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Cannot add rating",
    });
  });

  test("should handle invalid restaurant ID format", async () => {
    req.params.RestaurantId = "invalid-id";

    const castError = new Error("Cast Error");
    castError.name = "CastError";
    Restaurant.findById.mockRejectedValue(castError);

    console.error = jest.fn();

    await addRating(req, res, next);

    expect(Restaurant.findById).toHaveBeenCalledWith("invalid-id");
    expect(console.error).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Cannot add rating",
    });
  });
});
