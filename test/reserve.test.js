const { addReservation, getReservations } = require("../src/addReserve");
const Restaurant = require("../models/Restaurant");
const Reservation = require("../models/Reservation");

jest.mock("../models/Restaurant");
jest.mock("../models/Reservation");
jest.mock("../models/OrderBooking");

describe("Reservation Controller Tests", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      params: { RestaurantId: "123456789012" },
      body: { date: "2023-05-01", time: "18:00" },
      user: { id: "user123", role: "user" },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  function mockFindWithPopulate(mockData) {
    const firstPopulateMock = jest.fn().mockReturnThis();
    const secondPopulateMock = jest.fn().mockResolvedValue(mockData);
    Reservation.find.mockReturnValue({
      populate: firstPopulateMock,
    });
    firstPopulateMock.mockReturnValue({
      populate: secondPopulateMock,
    });
  }

  describe("addReservation", () => {
    test("should create a reservation successfully", async () => {
      const mockRestaurant = { id: "123456789012", name: "Test Restaurant" };
      Restaurant.findById.mockResolvedValue(mockRestaurant);
      Reservation.find.mockResolvedValue([{ id: "res1" }, { id: "res2" }]);
      const mockReservation = {
        id: "newRes",
        restaurant: "123456789012",
        user: "user123",
      };
      Reservation.create.mockResolvedValue(mockReservation);

      await addReservation(req, res, next);

      expect(Restaurant.findById).toHaveBeenCalledWith("123456789012");
      expect(Reservation.find).toHaveBeenCalledWith({ user: "user123" });
      expect(Reservation.create).toHaveBeenCalledWith({
        date: "2023-05-01",
        time: "18:00",
        restaurant: "123456789012",
        user: "user123",
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockReservation,
      });
    });

    test("should return 404 if restaurant is not found", async () => {
      Restaurant.findById.mockResolvedValue(null);

      await addReservation(req, res, next);

      expect(Restaurant.findById).toHaveBeenCalledWith("123456789012");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: `No restaurant with the id of ${req.params.RestaurantId}`,
      });
      expect(Reservation.create).not.toHaveBeenCalled();
    });

    test("should return 400 if user already has 3 reservations", async () => {
      const mockRestaurant = { id: "123456789012", name: "Test Restaurant" };
      Restaurant.findById.mockResolvedValue(mockRestaurant);
      Reservation.find.mockResolvedValue([
        { id: "res1" },
        { id: "res2" },
        { id: "res3" },
      ]);

      await addReservation(req, res, next);

      expect(Restaurant.findById).toHaveBeenCalledWith("123456789012");
      expect(Reservation.find).toHaveBeenCalledWith({ user: "user123" });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: `The user with ID ${req.user.id} has already made 3 reservations`,
      });
      expect(Reservation.create).not.toHaveBeenCalled();
    });

    test("should allow admin to create more than 3 reservations", async () => {
      req.user.role = "admin";
      const mockRestaurant = { id: "123456789012", name: "Test Restaurant" };
      Restaurant.findById.mockResolvedValue(mockRestaurant);
      Reservation.find.mockResolvedValue([
        { id: "res1" },
        { id: "res2" },
        { id: "res3" },
      ]);
      const mockReservation = {
        id: "newRes",
        restaurant: "123456789012",
        user: "user123",
      };
      Reservation.create.mockResolvedValue(mockReservation);

      await addReservation(req, res, next);

      expect(Restaurant.findById).toHaveBeenCalledWith("123456789012");
      expect(Reservation.find).toHaveBeenCalledWith({ user: "user123" });
      expect(Reservation.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockReservation,
      });
    });

    test("should handle errors and return 500 status", async () => {
      Restaurant.findById.mockRejectedValue(new Error("Database error"));
      await addReservation(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Cannot create Reservation",
      });
    });
  });
});
