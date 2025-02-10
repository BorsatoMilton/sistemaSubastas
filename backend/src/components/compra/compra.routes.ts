import { Router } from "express";
import { findAll, findOne, add,  remove, sanitizeCompraInput, cancelarCompra, findAllByUser } from "./compra.controler.js";
import { avisoCompraExitosa, confirmarCompra } from "../correo/correo.controller.js";

export const compraRouter = Router();  

compraRouter.get('/', findAll);
compraRouter.get('/byuser/:id', findAllByUser);
compraRouter.get('/:id', findOne);
compraRouter.post('/', sanitizeCompraInput, add);
compraRouter.post('/avisoCompraExitosa',avisoCompraExitosa);
compraRouter.post('/confirmarCompra',confirmarCompra);
compraRouter.delete('/cancelarCompra', cancelarCompra)
compraRouter.delete('/:id', remove);


