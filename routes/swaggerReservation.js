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
 */

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Get a reservation
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
 *         description: A reservations description by id
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
 *         description: The reservations was successfully created
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
 *         description: The reservations was deleted
 *       404:
 *         description: The restautant was not found
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
 *         description: The reservations was updated
 *       404:
 *         description: The restautant was not found
 *       500:
 *         description: Some error happened
 */