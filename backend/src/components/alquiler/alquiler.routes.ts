import {Router} from 'express';
import {sanitizeAlquilerInput, findAll, findAllByVehicle, findOne, add, update, remove} from './alquiler.controler.js';
import {confirmRent} from '../correo/correo.controller.js';
export const alquilerRouter = Router();

alquilerRouter.get('/', findAll);
alquilerRouter.get('/:id', findOne);
alquilerRouter.get('/vehiculo/:id', findAllByVehicle);
alquilerRouter.post('/', sanitizeAlquilerInput, add);
alquilerRouter.post('/confirmarAlquiler', confirmRent);
alquilerRouter.put('/:id', sanitizeAlquilerInput, update);
alquilerRouter.patch('/:id', sanitizeAlquilerInput, update);
alquilerRouter.delete('/:id', remove);