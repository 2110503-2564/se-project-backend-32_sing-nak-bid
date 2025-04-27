/**
 * @swagger
 * components:
 *   schemas:
 *     MenuItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated MongoDB ObjectId for the menu item
 *         name:
 *           type: string
 *           description: Name of the menu item
 *           maxLength: 50
 *         price:
 *           type: number
 *           description: Price of the menu item
 *           minimum: 0
 *         description:
 *           type: string
 *           description: Description of the menu item
 *         allergens:
 *           type: array
 *           description: List of allergens associated with the menu item
 *           items:
 *             type: string
 *             description: Allergen ID (ObjectId)
 *         restaurant:
 *           type: string
 *           description: The restaurant ID (ObjectId) this menu item belongs to
 *         available:
 *           type: boolean
 *           default: true
 *           description: Whether the menu item is currently available
 *         recommended:
 *           type: boolean
 *           default: false
 *           description: Whether the menu item is recommended
 *         orderCount:
 *           type: integer
 *           default: 0
 *           description: How many times the menu item has been ordered
 *         stockCount:
 *           type: integer
 *           default: 0
 *           description: Current stock count for the menu item
 *       required:
 *         - name
 *         - price
 *         - description
 *         - restaurant
 *       example:
 *         id: "680e0c1447829f05e0cba999"
 *         name: "Spaghetti Carbonara"
 *         price: 150
 *         description: "Creamy pasta with bacon and cheese sauce."
 *         allergens: ["680e0c1447829f05e0cbaaaa"]
 *         restaurant: "680e0c1447829f05e0cba123"
 *         available: true
 *         recommended: true
 *         orderCount: 120
 *         stockCount: 30
 */
/**
 * @swagger
 * tags:
 *   name: Menus
 *   description: Menu management for restaurants
 */

/**
 * @swagger
 * /restaurants/{restaurantId}/menu:
 *   get:
 *     summary: Get all menus from a restaurant
 *     tags: [Menus]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *     responses:
 *       200:
 *         description: List of menu items
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
 *       500:
 *         description: Cannot get Menu
 */

/**
 * @swagger
 * /restaurants/{restaurantId}/menu/{menuId}:
 *   get:
 *     summary: Get one menu item from a restaurant
 *     tags: [Menus]
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *       - in: path
 *         name: menuId
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu Item ID
 *     responses:
 *       200:
 *         description: Single menu item data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       404:
 *         description: Menu item not found
 *       500:
 *         description: Cannot find Menu
 */

/**
 * @swagger
 * /restaurants/{restaurantId}/menu:
 *   post:
 *     summary: Create a menu item for a restaurant
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stockCount:
 *                 type: integer
 *               allergens:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Menu item created successfully
 *       500:
 *         description: Cannot create MenuItem
 */

/**
 * @swagger
 * /restaurants/{restaurantId}/menu/{menuId}:
 *   put:
 *     summary: Update a menu item
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *       - in: path
 *         name: menuId
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu Item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               stockCount:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 *       404:
 *         description: Menu item not found
 *       500:
 *         description: Cannot update MenuItem
 */

/**
 * @swagger
 * /restaurants/{restaurantId}/menu/{menuId}:
 *   delete:
 *     summary: Delete a menu item
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: Restaurant ID
 *       - in: path
 *         name: menuId
 *         required: true
 *         schema:
 *           type: string
 *         description: Menu Item ID
 *     responses:
 *       200:
 *         description: Menu item deleted successfully
 *       404:
 *         description: Menu item not found
 *       500:
 *         description: Cannot delete MenuItem
 */

