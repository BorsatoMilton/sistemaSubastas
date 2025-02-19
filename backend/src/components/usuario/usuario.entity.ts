import {
    Entity,
    Property,
    ManyToOne,
    Rel,
    OneToMany, 
    Collection
} from '@mikro-orm/core'
import { BaseEntity } from '../../shared/db/baseEntity.entity.js'
import { Tarjeta } from './tarjeta.entity.js'
import { Calificacion } from './calificacion.entity.js'
import { Compra } from '../compra/compra.entity.js'
import {Vehiculo} from '../vehiculo/vehiculo.entity.js'
import { Alquiler } from '../alquiler/alquiler.entity.js'
import { Rol } from './rol.entity.js'

@Entity()
export class Usuario extends BaseEntity {
    @Property({ nullable: false })
    usuario!: string
    //DNI?
    @Property({ nullable: false })
    clave!: string

    @Property({ nullable: false})
    nombre!: string
    
    @Property({ nullable: false})
    apellido!: string
    
    @Property({ unique: true, nullable: false})
    mail!: string
    
    @Property({ nullable: false})
    direccion!: string
    
    @Property({ nullable: false})
    telefono!: string

    @OneToMany(() => Tarjeta, tarjeta => tarjeta.usuario, { nullable: false })
    tarjetas = new Collection<Tarjeta>(this)

    @OneToMany(() => Calificacion, calificacion => calificacion.usuario, { nullable: false })
    calificacionesUsuario = new Collection<Calificacion>(this)

    @OneToMany(() => Compra, compra => compra.usuario , { nullable: false })
    compras = new Collection<Compra>(this)

    @OneToMany(() => Vehiculo, vehiculo => vehiculo.propietario)
    vehiculos = new Collection<Vehiculo>(this)
    
    @OneToMany(() => Alquiler, alquiler => alquiler.locatario, { nullable: false })
    alquilerLocatorio= new Collection<Alquiler>(this)

    @ManyToOne(() => Rol, { nullable: false})
    rol!: Rel<Rol> 

  }