/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated MongoDB ObjectId for the reservation
 *         reservationDateTime:
 *           type: string
 *           format: date-time
 *           description: The date and time of the reservation
 *         user:
 *           type: string
 *           description: The user who made the reservation (referencing the User model)
 *         restaurant:
 *           type: string
 *           description: The restaurant where the reservation is made (referencing the Restaurant model)
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled]
 *           default: pending
 *           description: Status of the reservation
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the reservation was created
 *       example:
 *         id: 60f5f77b6d41629f09d29d7e
 *         reservationDateTime: "2025-04-28T18:30:00Z"
 *         user: 60f5f79b6d41629f09d29d7f
 *         restaurant: 60f5f7ab6d41629f09d29d80
 *         status: confirmed
 *         createdAt: "2025-04-25T10:00:00Z"
 */

/**
 * @swagger
 * tags:
 *   - name: Reservations
 *     description: API for managing reservations
 */


/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of reservations
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
 *                       reservationDateTime:
 *                         type: string
 *                         format: date-time
 *                       user:
 *                         type: string
 *                       restaurant:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           address:
 *                             type: string
 *                           tel:
 *                             type: string
 *                       status:
 *                         type: string
 *                         enum: [pending, preparing, completed, cancelled]
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       orderItems:
 *                         type: array
 *                         items:
 *                           type: object
 *                       orders:
 *                         type: array
 *                         items:
 *                           type: object
 *             example:
 *               success: true
 *               count: 1
 *               data:
 *                 - _id: "680f582ab34389ffa1ebd6a4"
 *                   reservationDateTime: "2025-03-10T00:00:00.000Z"
 *                   user: "680e33e61fa675ed398adf75"
 *                   restaurant:
 *                     _id: "680e0c1447829f05e0cba964"
 *                     name: "DEMO"
 *                     address: "123"
 *                     tel: "123-456-7890"
 *                   status: "pending"
 *                   createdAt: "2025-04-28T10:27:54.108Z"
 *                   orderItems: []
 *                   orders: []
 */

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Get a reservation by ID
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The reservation ID
 *     responses:
 *       200:
 *         description: A reservation description by ID
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
 *                     reservationDateTime:
 *                       type: string
 *                       format: date-time
 *                     user:
 *                       type: string
 *                     restaurant:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         address:
 *                           type: string
 *                         tel:
 *                           type: string
 *                     status:
 *                       type: string
 *                       enum: [pending, preparing, completed, cancelled]
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     orderItems:
 *                       type: array
 *                       items:
 *                         type: object
 *                     orders:
 *                       type: array
 *                       items:
 *                         type: object
 *             example:
 *               success: true
 *               data:
 *                 _id: "680f582ab34389ffa1ebd6a4"
 *                 reservationDateTime: "2025-03-10T00:00:00.000Z"
 *                 user: "680e33e61fa675ed398adf75"
 *                 restaurant:
 *                   _id: "680e0c1447829f05e0cba964"
 *                   name: "DEMO"
 *                   address: "123"
 *                   tel: "123-456-7890"
 *                 status: "pending"
 *                 createdAt: "2025-04-28T10:27:54.108Z"
 *                 orderItems: []
 *                 orders: []
 *       404:
 *         description: The reservation was not found
 */

/**
 * @swagger
 * /restaurants/{id}/reservations:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
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
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: The reservation was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       500:
 *         description: Some error happened
 */

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     summary: Delete a reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The reservation id
 *     responses:
 *       200:
 *         description: The reservation was deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties: {}
 *             example:
 *               success: true
 *               data: {}
 *       404:
 *         description: The reservation was not found
 */

/**
 * @swagger
 * /reservations/{id}:
 *   put:
 *     summary: Update a reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The reservation id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: The reservation was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: The reservation was not found
 *       500:
 *         description: Some error happened
 */
