import { Request, Response } from 'express'
import Product from '../models/Product.model.js'
import { json } from 'sequelize'

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll(
            {
                order: [
                    ['price', 'DESC']
                ],
            })

        res.json({ data: products })
    } catch (error) {
        console.log(error)
    }
}

export const getProductsById = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id)

        if (isNaN(id)) {
            return res.status(400).json({
                errors: [{ msg: 'ID no válido' }]
            })
        }

        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({
                error: 'Producto No Encontrado'
            })
        }

        return res.json({ data: product })

    } catch (error) {
        return res.status(500).json({
            error: 'Internal server error'
        })
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json({ data: product })
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (req: Request, res: Response) => {

    const id = Number(req.params.id)

    if (isNaN(id)) {
        return res.status(400).json({
            errors: [{ msg: 'ID no válido' }]
        })
    }

    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            errors: [{ msg: 'Producto no encontrado' }]
        })
    }

    const name = req.body.name?.trim()
    const price = Number(req.body.price)
    const availability =
        req.body.availability === true ||
        req.body.availability === 'true'

    if (!name || isNaN(price)) {
        return res.status(400).json({
            errors: [{ msg: 'Datos inválidos' }]
        })
    }

    // 🔥 UPDATE limpio
    await product.update({
        name,
        price,
        availability
    })

    return res.json({ data: product })
}

export const updateAvailability = async (req: Request, res: Response) => {
    const id = Number(req.params.id as string)



    if (isNaN(id)) {
        return res.status(400).json({
            errors: [{ msg: 'ID no válido' }]
        })
    }

    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            error: 'Producto No Encontrado'
        })
    }


    product.availability = !product.availability
    await product.save();

    res.json({ data: product })
}

export const deleteProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id as string)

    if (isNaN(id)) {
        return res.status(400).json({
            errors: [{ msg: 'ID no válido' }]
        })
    }

    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({
            errors: [{ msg: 'Producto no encontrado' }]
        })
    }

    await product.destroy()

    res.json({ data: 'Producto Eliminado' })
}