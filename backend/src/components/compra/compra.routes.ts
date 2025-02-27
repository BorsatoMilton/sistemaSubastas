import { Router } from "express";
import { findAll, findOne, add, remove, sanitizeCompraInput, findOneByVehiculo, confirmarCompraMail ,cancelarCompra, avisoCompraExitosa, findAllByUser, confirmarCompra } from "./compra.controler.js";


export const compraRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Compra:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único de la compra
 *         fechaCompra:
 *           type: string
 *           format: date-time
 *           description: Fecha de la compra
 *         fechaLimiteConfirmacion:
 *           type: string
 *           format: date-time
 *           description: Fecha límite para el pago
 *         fechaCancelacion:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Fecha de cancelación (si aplica)
 *         usuario:
 *           $ref: '#/components/schemas/Usuario'
 *         vehiculo:
 *           $ref: '#/components/schemas/Vehiculo'
 *       required:
 *         - fechaCompra
 *         - fechaLimiteConfirmacion
 *         - usuario
 *         - vehiculo
 */

/**
 * @swagger
 * /api/compras:
 *   get:
 *     summary: Obtiene todas las compras
 *     tags: [Compra]
 *     responses:
 *       200:
 *         description: Lista de compras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Compra'
 *       500:
 *         description: Error al obtener las compras
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener las compras
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
compraRouter.get('/', findAll);

/**
 * @swagger
 * /api/compras/byuser/{id}:
 *   get:
 *     summary: Obtiene compras por ID de usuario
 *     tags: [Compra]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de compras del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Compra'
 *       500:
 *         description: Error al obtener las compras por usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener las compras por usuario
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
compraRouter.get('/byuser/:userId', findAllByUser);

compraRouter.get('/:id', findOne);

compraRouter.get('/byvehiculo/:idVehiculo', findOneByVehiculo);

/**
 * @swagger
 * /api/compras/{id}:
 *   get:
 *     summary: Obtiene una compra por ID
 *     tags: [Compra]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la compra
 *     responses:
 *       200:
 *         description: Compra encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compra'
 *       404:
 *         description: Compra no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Compra no encontrada
 *       500:
 *         description: Error al obtener la compra
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener la compra
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
compraRouter.get('/:id', findOne);

/**
 * @swagger
 * /api/compras:
 *   post:
 *     summary: Crea una nueva compra
 *     tags: [Compra]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Compra'
 *     responses:
 *       201:
 *         description: Compra creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Compra'
 *       500:
 *         description: Error al crear la compra
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al crear la compra
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
compraRouter.post('/', sanitizeCompraInput, add);

/**
 * @swagger
 * /api/compras/avisoCompraExitosa:
 *   post:
 *     summary: Envía aviso de compra exitosa
 *     tags: [Compra]
 *     responses:
 *       200:
 *         description: Aviso enviado correctamente
 *       500:
 *         description: Error al enviar el aviso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al enviar el aviso
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
compraRouter.post('/avisoCompraExitosa/:mail', avisoCompraExitosa);

/**
 * @swagger
 * /api/compras/confirmarCompra:
 *   post:
 *     summary: Confirma una compra
 *     tags: [Compra]
 *     responses:
 *       200:
 *         description: Compra confirmada correctamente
 *       500:
 *         description: Error al confirmar la compra
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al confirmar la compra
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
compraRouter.post('/confirmarCompraAviso/:idCompra', confirmarCompraMail);

compraRouter.patch('/confirmarCompra/:idCompra', confirmarCompra);

/**
 * @swagger
 * /api/compras/cancelarCompra:
 *   patch:
 *     summary: Cancela una compra
 *     tags: [Compra]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID de la compra a cancelar
 *     responses:
 *       200:
 *         description: Compra cancelada exitosamente
 *       400:
 *         description: ID de compra requerido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: El id de la compra es requerido
 *                 data: 
 *                  type: object
 *                 example: {Compra}
 *       404:
 *         description: Compra no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Compra no encontrada
 *       500:
 *         description: Error al cancelar la compra
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al cancelar la compra
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
compraRouter.patch('/cancelarCompra/:id', cancelarCompra);

/**
 * @swagger
 * /api/compras/{id}:
 *   delete:
 *     summary: Elimina una compra
 *     tags: [Compra]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la compra
 *     responses:
 *       200:
 *         description: Compra eliminada exitosamente
 *       404:
 *         description: Compra no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Compra no encontrada
 *       500:
 *         description: Error al eliminar la compra
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al eliminar la compra
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
compraRouter.delete('/:id', remove);