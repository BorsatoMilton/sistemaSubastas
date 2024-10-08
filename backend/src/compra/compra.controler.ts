import { Request, Response, NextFunction } from "express";
import { Compra } from "./compra.entity.js";
import { orm } from "../shared/db/orm.js";


const em = orm.em

function sanitizeCompraInput (
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = 
    {
        fecha: req.body.fecha,
        usuario: req.body.usuario
      }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}


async function findAll(req: Request, res: Response) {
    try {
        const compras = await em.find(Compra,{})
        res.status(200).json({ message: 'Compra', data: compras })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const id = req.params.id
        const compra = await em.findOneOrFail(Compra, { id })
        res.status(200).json({ message: 'Compra Encontrado', data: compra })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function add(req: Request, res: Response) {
    try {
        const compra = em.create(Compra, req.body.sanitizedInput)
        await em.flush()
        res.status(201).json({ message: 'Compra creado', data: compra })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function update(req: Request, res: Response) {
    try {
        const id = req.params.id
        const compraActualizar = await em.findOneOrFail(Compra, { id })
        em.assign(compraActualizar, req.body.sanitizedInput)
        await em.flush()
        res.status(200).json({ message: 'Compra actualizado', data: compraActualizar })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function remove(req: Request, res: Response) {
    try {
        const id = req.params.id
        const compra = em.getReference(Compra, id)
        await em.removeAndFlush(compra)
        res.status(200).json({ message: 'Compra eliminado' })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export { sanitizeCompraInput, findAll, findOne, add, update, remove }