import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, getProducts, getProductsById, updateProduct, updateAvailability, deleteProduct } from './handlers/product.js';
import { handleInputErrors } from './middleware/index.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier of the product
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the product
 *           example: Curved Monitor 49 Inches
 *         price:
 *           type: number
 *           description: The price of the product
 *           example: 300
 *         availability:
 *           type: boolean
 *           description: Indicates whether the product is available
 *           example: true
 */



/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get a list of products
 *     tags:
 *       - Products
 *     description: Returns a list of available products
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Products
 *     description: Returns a product based on its unique identifier
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product Not Found
 *       400:
 *         description: Bad Request - Invalid ID
 */


router.get('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductsById)

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     description: Returns a new record created in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Curved Monitor 49 Inches"
 *               price:
 *                 type: number
 *                 example: 399
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad Request - invalid input data
 */



router.post('/',

    body('name').notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
    body('price').isNumeric().custom(value => value > 0).withMessage('Valor no valido').notEmpty().withMessage('El precio del Producto no puede ir vacio'),
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product with user input
 *     tags:
 *       - Products
 *     description: Returns the updated product
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Curved Monitor 49 Inches"
 *               price:
 *                 type: number
 *                 example: 399
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Successful response with the updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - Invalid ID or Invalid input data
 *       404:
 *         description: Product Not Found
 */


router.put('/:id',
    body('name').notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
    body('price').isNumeric().custom(value => value > 0).withMessage('Valor no valido').notEmpty().withMessage('El precio del Producto no puede ir vacio'),
    body('availability').isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update product availability
 *     tags:
 *       - Products
 *     description: Returns the updated product availability
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Successful response with updated availability
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - Invalid ID 
 *       404:
 *         description: Product Not Found
 */



router.patch('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Products
 *     description: Returns a confirmation message after deleting the product
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Product Deleted"
 *       400:
 *         description: Bad Request - Invalid ID
 *       404:
 *         description: Product Not Found
 */


router.delete('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)

export default router;