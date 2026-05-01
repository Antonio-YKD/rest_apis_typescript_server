import  { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

@Table({
    tableName: 'products'
})
class Product extends Model {

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    declare name: string

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    declare price: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true
    })
    declare availability: boolean
}

export default Product;