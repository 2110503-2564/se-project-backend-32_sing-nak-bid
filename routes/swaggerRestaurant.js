/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated MongoDB ObjectId
 *         name:
 *           type: string
 *           maxLength: 50
 *           description: Restaurant name
 *         address:
 *           type: string
 *           description: Restaurant address
 *         district:
 *           type: string
 *           description: District where the restaurant is located
 *         province:
 *           type: string
 *           description: Province where the restaurant is located
 *         postalcode:
 *           type: string
 *           maxLength: 5
 *           description: Postal code (5 digits)
 *         tel:
 *           type: string
 *           description: Telephone number
 *         region:
 *           type: string
 *           description: Geographical region (e.g., North, South, Central)
 *         opentime:
 *           type: string
 *           pattern: "^\\d{2}:\\d{2}$"
 *           description: Opening time (HH:mm format)
 *         closetime:
 *           type: string
 *           pattern: "^\\d{2}:\\d{2}$"
 *           description: Closing time (HH:mm format)
 *         managerId:
 *           type: string
 *           description: Manager's User ID (ObjectId)
 *         picture:
 *           type: string
 *           description: URL to restaurant picture
 *         ratings:
 *           type: array
 *           items:
 *             type: string
 *             description: Rating IDs (ObjectIds)
 *         averageRating:
 *           type: number
 *           format: float
 *           default: 0
 *           description: Average rating score
 *       example:
 *         id: 6800ab45f3ba9b608b7eed0e
 *         name: Louisvanich
 *         address: 1642 Banthat Thong Rd Subdistrict Rong Muang
 *         distinct: Pathumwan
 *         province: Bangkok
 *         postalcode: 10330
 *         tel: 063-993-6550
 *         region: Central
 *         opentime: 12:00
 *         closetime: 23:00
 *         managerId: 6800ab13f3ba9b608b7eed09
 *         picture: picture_url
 *         ratings: []
 *         averageRating: 4.7
 */

/**
 * @swagger
 * tags:
 *   - name: Restaurants
 *     description: API for managing restaurants
 */

/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Get all restaurants
 *     tags: [Restaurants]   # <-- Tell Swagger this route belongs to the Restaurants tag
 *     responses:
 *       200:
 *         description: A list of restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 */
/**
 * @swagger
 * /restaurants/{id}:
 *   get:
 *     summary: Get a restaurant
 *     tags: [Restaurants]   # <-- Tell Swagger this route belongs to the Restaurants tag
 *     responses:
 *       200:
 *         description: A restaurants description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: The restautant was not found
 */