import { Router } from "express";
import { 
  findAll, 
  findOneById, 
  findOneByEmailOrUsername, 
  checkUsername, 
  checkEmail, 
  add, 
  update, 
  resetPasswordWithoutToken, 
  remove, 
  sanitizeUsuarioInput, 
  login, 
  findOneByEmailDestinatario,
  resetPassword,
  validatePassword
} from "./usuario.controler.js";

export const usuarioRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Identificador único del usuario
 *         usuario:
 *           type: string
 *           description: Nombre de usuario
 *         clave:
 *           type: string
 *           description: Contraseña del usuario
 *         nombre:
 *           type: string
 *           description: Nombre del usuario
 *         apellido:
 *           type: string
 *           description: Apellido del usuario
 *         mail:
 *           type: string
 *           description: Correo electrónico del usuario
 *         telefono:
 *           type: string
 *           description: Teléfono del usuario
 *         direccion:
 *           type: string
 *           description: Dirección del usuario
 *         rol:
 *           type: string
 *           description: Rol del usuario
 *       required:
 *         - usuario
 *         - mail
 *         - clave
 *         - nombre
 *         - apellido
 *         - telefono
 *         - direccion
 *         - rol
 */

/**
 * @swagger
 * /api/usuario:
 *   get:
 *     summary: Obtiene una lista de todos los usuarios
 *     tags: [Usuario]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Error al obtener los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener los usuarios
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
usuarioRouter.get("/", findAll);

// Endpoint GET /:id
/**
 * @swagger
 * /api/usuario/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error al obtener el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener el usuario
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
usuarioRouter.get("/:id", findOneById);

// Endpoint GET /checkusername/:username
/**
 * @swagger
 * /api/usuario/checkusername/{username}:
 *   get:
 *     summary: Verifica disponibilidad de nombre de usuario
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de usuario
 *     responses:
 *       200:
 *         description: Resultado de disponibilidad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 available:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Error en la verificación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al verificar el nombre de usuario
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
usuarioRouter.get("/checkusername/:username", checkUsername);

// Endpoint GET /checkemail/:email
/**
 * @swagger
 * /api/usuario/checkemail/{email}:
 *   get:
 *     summary: Verifica disponibilidad de correo electrónico
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Correo electrónico
 *     responses:
 *       200:
 *         description: Resultado de disponibilidad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 available:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Error en la verificación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al verificar el correo electrónico
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
usuarioRouter.get("/checkemail/:email", checkEmail);

// Endpoint GET /bymail/:mail
/**
 * @swagger
 * /api/usuario/bymail/{mail}:
 *   get:
 *     summary: Obtiene usuario por correo electrónico
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: mail
 *         schema:
 *           type: string
 *         required: true
 *         description: Correo electrónico
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error al obtener el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener el usuario
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
usuarioRouter.get("/bymail/:mail", findOneByEmailDestinatario);

// Endpoint GET /:user/:mail
/**
 * @swagger
 * /api/usuario/{user}/{mail}:
 *   get:
 *     summary: Obtiene usuario por nombre de usuario o correo
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: user
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de usuario
 *       - in: path
 *         name: mail
 *         schema:
 *           type: string
 *         required: true
 *         description: Correo electrónico
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error al obtener el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener el usuario
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
usuarioRouter.get("/:user/:mail", findOneByEmailOrUsername);

usuarioRouter.post("/reset", resetPassword)
/**
 * @swagger
 * /api/usuario/login:
 *   post:
 *     summary: Inicio de sesión de usuario
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticación
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Credenciales inválidas
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error al iniciar sesión
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al iniciar sesión
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
usuarioRouter.post("/login", login);

// Endpoint POST /
/**
 * @swagger
 * /api/usuario:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error de validación o usuario ya existente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ya existe un usuario con ese nombre de usuario o correo electrónico.
 *       500:
 *         description: Error al crear el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al crear el usuario
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
usuarioRouter.post("/", sanitizeUsuarioInput, add);

usuarioRouter.post("/validate/:id", validatePassword)

/**
 * @swagger
 * /api/usuario/{id}:
 *   put:
 *     summary: Actualiza un usuario
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al actualizar el usuario
 *                 error:
 *                   type: string
 *                   example: Detalles del error
 */
usuarioRouter.put("/:id", sanitizeUsuarioInput, update);

/**
 * @swagger
 * /api/usuario/{id}:
 *   patch:
 *     summary: Restablece contraseña sin token
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Contraseña actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error al actualizar la contraseña
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al actualizar la contraseña
 */
usuarioRouter.patch("/:id", sanitizeUsuarioInput, resetPasswordWithoutToken);

/**
 * @swagger
 * /api/usuario/{id}:
 *   delete:
 *     summary: Elimina un usuario existente
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado con exito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error al eliminar el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al eliminar el usuario
*/
usuarioRouter.delete("/:id", remove);
