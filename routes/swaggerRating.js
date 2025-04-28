/**
 * @swagger
 * tags:
 *   name: Ratings
 *   description: Managing restaurant ratings
 */

/**
 * @swagger
 * /restaurants/{restaurantId}/rating:
 *   get:
 *     summary: Get all ratings for a restaurant
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *     responses:
 *       200:
 *         description: Successfully fetched ratings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Rating'
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Cannot get ratings
 */

/**
 * @swagger
 * /restaurants/{restaurantId}/rating/{ratingId}:
 *   get:
 *     summary: Get a single rating
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: ratingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched rating
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rating'
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Rating'
 *       404:
 *         description: Rating or restaurant not found
 *       500:
 *         description: Cannot get rating
 */

/**
 * @swagger
 * /restaurants/{restaurantId}/rating:
 *   post:
 *     summary: Add a new rating to a restaurant
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rating'
 *     responses:
 *       201:
 *         description: Rating created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Rating'
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Cannot add rating
 */

/**
 * @swagger
 * /restaurants/{restaurantId}/rating/{ratingId}:
 *   put:
 *     summary: Update an existing rating
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: ratingId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rating'
 *     responses:
 *       200:
 *         description: Rating updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Rating'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Rating or restaurant not found
 *       500:
 *         description: Cannot update rating
 */

/**
 * @swagger
 * /restaurants/{restaurantId}/rating/{ratingId}:
 *   delete:
 *     summary: Delete a rating
 *     tags: [Ratings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: ratingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rating deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Rating or restaurant not found
 *       500:
 *         description: Cannot delete rating
 */
