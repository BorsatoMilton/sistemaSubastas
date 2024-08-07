import {
    Entity,
    Property,
    ManyToOne,
    Rel
} from '@mikro-orm/core'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'
import { Pedido } from './pedido.entity.js'
import { Producto } from '../producto/producto.entity.js'


@Entity()

export class LineaCompra extends BaseEntity{
    @Property ({nullable: false})
    cantidad!: number
    
    @ManyToOne(() => Pedido, { nullable: false })
    pedido!: Rel<Pedido>

    @ManyToOne(() => Producto, { nullable: false })
    producto!: Rel<Producto>
}