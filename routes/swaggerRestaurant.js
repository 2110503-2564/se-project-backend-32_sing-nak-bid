/**
 * @swagger
 * components:
 *   schemas:
 *     Rating:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: User ID who gave the rating
 *         score:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           description: Rating score (1-5)
 *         comment:
 *           type: string
 *           description: Optional comment for the rating
 *       required:
 *         - user
 *         - score
 *       example:
 *         user: "680e0c1447829f05e0cba123"
 *         score: 5
 *         comment: "Amazing food!"

 *     Restaurant:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated MongoDB ObjectId
 *         name:
 *           type: string
 *           description: Restaurant name
 *           maxLength: 50
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
 *           description: Manager's User ID
 *         picture:
 *           type: string
 *           description: URL to restaurant picture
 *         ratings:
 *           type: array
 *           description: List of ratings
 *           items:
 *             $ref: '#/components/schemas/Rating'
 *         averageRating:
 *           type: number
 *           format: float
 *           default: 0
 *           description: Average rating score
 *       required:
 *         - name
 *         - address
 *         - distinct
 *         - province
 *         - postalcode
 *         - tel
 *         - region
 *         - opentime
 *         - closetime
 *         - managerId
 *       example:
 *         id: "680e0c1447829f05e0cba964"
 *         name: "Louisvanich"
 *         address: "1642 Banthat Thong Rd"
 *         district: "Pathumwan"
 *         province: "Bangkok"
 *         postalcode: "10330"
 *         tel: "063-993-6550"
 *         region: "Central"
 *         opentime: "12:00"
 *         closetime: "23:00"
 *         managerId: "680e0c0b47829f05e0cba961"
 *         picture: "http://example.com/picture.jpg"
 *         ratings: []
 *         averageRating: 4.5
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
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: A list of restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       address:
 *                         type: string
 *                       district:
 *                         type: string
 *                       province:
 *                         type: string
 *                       postalcode:
 *                         type: string
 *                       tel:
 *                         type: string
 *                       region:
 *                         type: string
 *                       opentime:
 *                         type: string
 *                       closetime:
 *                         type: string
 *                       managerId:
 *                         type: string
 *                       ratings:
 *                         type: array
 *                         items:
 *                           type: number
 *                       averageRating:
 *                         type: number
 *                       reservations:
 *                         type: array
 *                         items:
 *                           type: object
 *                       menuItems:
 *                         type: array
 *                         items:
 *                           type: object
 *             example:
 *               success: true
 *               count: 1
 *               data:
 *                 - _id: "680e0c1447829f05e0cba964"
 *                   name: "DEMO"
 *                   address: "123"
 *                   district: "123"
 *                   province: "123"
 *                   postalcode: "90210"
 *                   tel: "123-456-7890"
 *                   region: "West Coast"
 *                   opentime: "08:00"
 *                   closetime: "22:00"
 *                   managerId: "680e0c0b47829f05e0cba961"
 *                   ratings: []
 *                   averageRating: 0
 *                   reservations: []
 *                   menuItems: []
 */

/**
 * @swagger
 * /restaurants/{id}:
 *   get:
 *     summary: Get a restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The restaurant id
 *     responses:
 *       200:
 *         description: A restaurant description by id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     address:
 *                       type: string
 *                     district:
 *                       type: string
 *                     province:
 *                       type: string
 *                     postalcode:
 *                       type: string
 *                     tel:
 *                       type: string
 *                     region:
 *                       type: string
 *                     opentime:
 *                       type: string
 *                     closetime:
 *                       type: string
 *                     managerId:
 *                       type: string
 *                     ratings:
 *                       type: array
 *                       items:
 *                         type: number
 *                     averageRating:
 *                       type: number
 *                     reservations:
 *                       type: array
 *                       items:
 *                         type: object
 *                     menuItems:
 *                       type: array
 *                       items:
 *                         type: object
 *             example:
 *               success: true
 *               data:
 *                 _id: "680e0c1447829f05e0cba964"
 *                 name: "DEMO"
 *                 address: "123"
 *                 district: "123"
 *                 province: "123"
 *                 postalcode: "90210"
 *                 tel: "123-456-7890"
 *                 region: "West Coast"
 *                 opentime: "08:00"
 *                 closetime: "22:00"
 *                 managerId: "680e0c0b47829f05e0cba961"
 *                 ratings: []
 *                 averageRating: 0
 *                 reservations: []
 *                 menuItems: []
 *       404:
 *         description: The restaurant was not found
 */

/**
 * @swagger
 * /restaurants:
 *   post:
 *     summary: Create a new restaurant
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       201:
 *         description: The restaurant was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Restaurant'
 *       500:
 *         description: Some error happened
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *             example:
 *               success: false
 *               message: "Internal server error"
 */

/**
 * @swagger
 * /restaurants/{id}:
 *   delete:
 *     summary: Delete a restaurant
 *     tags: [Restaurants]  
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The restaurant id
 *     responses:
 *       200:
 *         description: The restaurants was deleted
 *       404:
 *         description: The restautant was not found
 */
/**
 * @swagger
 * /restaurants/{id}:
 *   put:
 *     summary: Update a restaurant
 *     tags: [Restaurants]   
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The restaurant id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       200:
 *         description: The restaurants was updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: The restautant was not found
 *       500:
 *         description: Some error happened
 */