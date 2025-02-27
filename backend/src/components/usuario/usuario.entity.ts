import {
    Entity,
    Property,
    ManyToOne,
    Rel,
    OneToMany, 
    Collection,
    Cascade
} from '@mikro-orm/core'
import { BaseEntity } from '../../shared/db/baseEntity.entity.js'
import { Tarjeta } from './tarjeta.entity.js'
import { Calificacion } from './calificacion.entity.js'
import { Compra } from '../compra/compra.entity.js'
import {Vehiculo} from '../vehiculo/vehiculo.entity.js'
import { Alquiler } from '../alquiler/alquiler.entity.js'


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

    @Property({ nullable: false})
    rol!: string

    @OneToMany(() => Tarjeta, tarjeta => tarjeta.usuario, { nullable: false, cascade: [ Cascade.REMOVE ] })
    tarjetas = new Collection<Tarjeta>(this)

    @OneToMany(() => Calificacion, calificacion => calificacion.usuario, { nullable: false, cascade: [ Cascade.REMOVE ] })
    calificacionesUsuario = new Collection<Calificacion>(this)

    @OneToMany(() => Compra, compra => compra.usuario , { nullable: false, cascade: [ Cascade.REMOVE ] })
    compras = new Collection<Compra>(this)

    @OneToMany(() => Vehiculo, vehiculo => vehiculo.propietario, { nullable: true, cascade: [Cascade.REMOVE]   })
    vehiculos = new Collection<Vehiculo>(this)
    
    @OneToMany(() => Alquiler, alquiler => alquiler.locatario, { nullable: false, cascade: [Cascade.REMOVE]   })
    alquilerLocatorio= new Collection<Alquiler>(this)


  }