/**
 * @swagger
 * components:
 *   schemas:
 *     OrderBooking:
 *       type: object
 *       properties:
 *         reservation:
 *           type: string
 *           description: Reference to the Reservation ID
 *         restaurant:
 *           type: string
 *           description: Reference to the Restaurant ID
 *         checkInStatus:
 *           type: boolean
 *           description: Whether the user has checked in
 *         checkInTime:
 *           type: string
 *           format: date-time
 *           description: Time when user checked in
 *         totalPrice:
 *           type: number
 *           description: Total price of the order
 *         phoneNumber:
 *           type: string
 *           description: User's phone number
 *         emailUser:
 *           type: string
 *           description: User's email address
 *         status:
 *           type: string
 *           enum: [pending, preparing, completed, cancelled]
 *           description: Status of the order
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Order creation timestamp
 *         orderItems:
 *           type: array
 *           description: List of ordered items
 *           items:
 *             type: object
 *             properties:
 *               menuItem:
 *                 type: string
 *                 description: Menu item ID
 *               menuName:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               note:
 *                 type: string
 *       example:
 *         reservation: "680d0266f6d6ffe828522a09"
 *         restaurant: "6800ab45f3ba9b608b7eed0e"
 *         checkInStatus: false
 *         checkInTime: null
 *         totalPrice: 409
 *         phoneNumber: "1234567890"
 *         emailUser: "example@email.com"
 *         status: "pending"
 *         createdAt: "2025-04-26T15:57:50.101Z"
 *         orderItems:
 *           - menuItem: "6800ab45f3ba9b608b7eed1a"
 *             menuName: "Spaghetti Carbonara"
 *             quantity: 2
 *             note: "Extra cheese, no onion"
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Manage orders related to reservations
 */

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Get all orders of the user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "680d027ef6d6ffe828522a20"
 *                       reservation:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "680d0266f6d6ffe828522a09"
 *                           reservationDateTime:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-04-29T17:00:00.000Z"
 *                           user:
 *                             type: string
 *                             example: "67c4817b2a6e6a17f95b48da"
 *                           restaurant:
 *                             type: string
 *                             example: "6800ab45f3ba9b608b7eed0e"
 *                           status:
 *                             type: string
 *                             example: "pending"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-04-26T15:57:26.471Z"
 *                       restaurant:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "6800ab45f3ba9b608b7eed0e"
 *                           name:
 *                             type: string
 *                             example: "Louisvanich"
 *                           address:
 *                             type: string
 *                             example: "1642 Banthat Thong Rd Subdistrict Rong Muang"
 *                           district:
 *                             type: string
 *                             example: "Pathumwan"
 *                           province:
 *                             type: string
 *                             example: "Bangkok"
 *                           postalcode:
 *                             type: string
 *                             example: "10330"
 *                           tel:
 *                             type: string
 *                             example: "063-993-6550"
 *                           region:
 *                             type: string
 *                             example: "Central"
 *                           opentime:
 *                             type: string
 *                             example: "12:00"
 *                           closetime:
 *                             type: string
 *                             example: "23:00"
 *                           managerId:
 *                             type: string
 *                             example: "6800ab13f3ba9b608b7eed09"
 *                           averageRating:
 *                             type: number
 *                             example: 2
 *                           ratings:
 *                             type: array
 *                             items:
 *                               type: object
 *                             example: []
 *                       checkInStatus:
 *                         type: boolean
 *                         example: false
 *                       checkInTime:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       totalPrice:
 *                         type: number
 *                         example: 409
 *                       phoneNumber:
 *                         type: string
 *                         example: "1234567890"
 *                       status:
 *                         type: string
 *                         example: "pending"
 *                       orderItems:
 *                         type: array
 *                         items:
 *                           type: object
 *                         example: []
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-04-26T15:57:50.101Z"
 */

/**
 * @swagger
 * /reservations/{reservationId}/order/{orderId}:
 *   get:
 *     summary: Get one order by reservation
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: reservationId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the reservation
 *       - name: orderId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order
 *     responses:
 *       200:
 *         description: Successfully retrieved the order
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 _id: "680d027ef6d6ffe828522a20"
 *                 reservation:
 *                   _id: "680d0266f6d6ffe828522a09"
 *                   reservationDateTime: "2025-04-29T17:00:00.000Z"
 *                   user: "67c4817b2a6e6a17f95b48da"
 *                   restaurant: "6800ab45f3ba9b608b7eed0e"
 *                   status: "pending"
 *                   createdAt: "2025-04-26T15:57:26.471Z"
 *                   __v: 0
 *                   id: "680d0266f6d6ffe828522a09"
 *                 restaurant:
 *                   _id: "6800ab45f3ba9b608b7eed0e"
 *                   name: "Louisvanich"
 *                   address: "1642 Banthat Thong Rd Subdistrict Rong Muang"
 *                   district: "Pathumwan"
 *                   province: "Bangkok"
 *                   postalcode: "10330"
 *                   tel: "063-993-6550"
 *                   region: "Central"
 *                   opentime: "12:00"
 *                   closetime: "23:00"
 *                   managerId: "6800ab13f3ba9b608b7eed09"
 *                   __v: 4
 *                   averageRating: 2
 *                   ratings: []
 *                   id: "6800ab45f3ba9b608b7eed0e"
 *                 checkInStatus: false
 *                 checkInTime: null
 *                 totalPrice: 409
 *                 phoneNumber: "1234567890"
 *                 status: "pending"
 *                 orderItems: []
 *                 createdAt: "2025-04-26T15:57:50.101Z"
 *                 __v: 0
 */


/**
 * @swagger
 * /reservations/{reservationId}/order:
 *   post:
 *     summary: Create a new order under a reservation
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderBooking'
 *     responses:
 *       200:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderBooking'
 *       400:
 *         description: User has already made an order or not authorized
 *       404:
 *         description: No reservation found
 *       500:
 *         description: Cannot create Order
 */

/**
 * @swagger
 * /reservations/{reservationId}/order/{orderId}:
 *   put:
 *     summary: Update an existing order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderBooking'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderBooking'
 *       401:
 *         description: Not authorized to update this order
 *       404:
 *         description: Order not found
 *       500:
 *         description: Cannot update Order
 */

/**
 * @swagger
 * /reservations/{reservationId}/order/{orderId}:
 *   delete:
 *     summary: Delete an existing order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   example: {}
 *       401:
 *         description: Not authorized to delete this order
 *       404:
 *         description: Order not found
 *       500:
 *         description: Cannot delete Order
 */
