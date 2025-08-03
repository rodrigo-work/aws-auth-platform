import { Router } from 'express'
import { UsersController } from '../controllers/users.controller'
import { validate } from '../middlewares/validateHandler'
import { deleteUserSchema, updateUserSchema } from '../schemas/users.schema'

export class UsersRoutes {
  private router: Router
  private usersController: UsersController

  constructor() {
    this.router = Router()
    this.usersController = new UsersController()
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    /**
     * swagger
     * /users:
     *   post:
     *     tags:
     *       - Users
     *     summary: Criar usuário
     *     description: Cria um novo usuário no User Pool do Cognito.
     *     operationId: createUser
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *             properties:
     *               name:
     *                 type: string
     *                 example: "fake-group"
     *           example:
     *             given_name: Fake
     *             family_name: User
     *             username: me+fake@rodrigo3d.com
     *             password: 'fake123'
     *     responses:
     *       201:
     *         description: Usuário criado com sucesso
     *       400:
     *         description: Dados inválidos
     *       500:
     *         description: Erro interno do servidor
     */
    // this.router.post('/', this.usersController.createUser.bind(this.usersController))
    /**
     * @swagger
     * /users:
     *   get:
     *     tags:
     *       - Users
     *     summary: Listar todos os usuarios
     *     description: Lista todos os usuarios do User Pool
     *     operationId: getAllUsers
     *     parameters:
     *       - name: limit
     *         in: query
     *         description: Limit
     *         required: false
     *         schema:
     *           type: number
     *           example: 10
     *       - name: page
     *         in: query
     *         description: Page
     *         required: false
     *         schema:
     *           type: number
     *           example: 1
     *     responses:
     *       200:
     *         description: Success
     *       400:
     *         description: Bad Raquest
     */
    this.router.get('/', this.usersController.getAllUsers.bind(this.usersController))
    /**
     * swagger
     * /users/{username}:
     *   put:
     *     tags:
     *       - Users
     *     summary: Atualizar usuario
     *     description: Altera dados do usuario
     *     operationId: updateUsers
     *     parameters:
     *       - name: username
     *         in: path
     *         description: username
     *         required: false
     *         schema:
     *           type: string
     *           example: me+fake@rodrigo3d.com
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - username
     *               - attributes
     *             properties:
     *               username:
     *                 type: string
     *                 example: me@rodrigo3d.com
     *               attributes:
     *                 type: array
     *                 items:
     *                   type: object
     *                   required:
     *                     - Name
     *                     - Value
     *                   properties:
     *                     Name:
     *                       type: string
     *                       example: email
     *                     Value:
     *                       type: string
     *                       example: me+fake@rodrigo3d.com
     *
     *           example:
     *             username: me+fake@rodrigo3d.com
     *             gender: male
     *             name: Fake User
     *     responses:
     *       200:
     *         description: Requisição bem-sucedida
     *       201:
     *         description: Convidado criado com sucesso
     *       400:
     *         description: Dados inválidos
     */
    // this.router.put(
    //   '/:username',
    //   validate(updateUserSchema),
    //   this.usersController.updateUser.bind(this.usersController)
    // )
    /**
     * swagger
     * /users/{username}:
     *   delete:
     *     tags:
     *       - Users
     *     summary: Deletar usuario
     *     description: Remove um usuario | const forbidden = ['me@rodrigo3d.com', 'me@rodrigo.work']
     *     operationId: deleteUsers
     *     parameters:
     *       - name: username
     *         in: path
     *         description: Name
     *         required: true
     *         schema:
     *           type: string
     *           example: me+fake@rodrigo3d.com
     *     responses:
     *       200:
     *         description: successful operation
     *       400:
     *         description: Invalid status value
     *       404:
     *         description: not found
     */
    // this.router.delete(
    //   '/:username',
    //   validate(deleteUserSchema),
    //   this.usersController.deleteUser.bind(this.usersController)
    // )
    /**
     * @swagger
     * /users/{username}:
     *   get:
     *     tags:
     *       - Users
     *     summary: Obter usuario
     *     description: Recupera informações de um usuario específico
     *     operationId: getUsersById
     *     parameters:
     *       - name: username
     *         in: path
     *         description: Name
     *         required: true
     *         schema:
     *           type: string
     *           example: me@rodrigo3d.com
     *     responses:
     *       200:
     *         description: successful operation
     *       400:
     *         description: Invalid status value
     *       404:
     *         description: not found
     */
    this.router.get('/:username', this.usersController.getUsersById.bind(this.usersController))
    /**
     * @swagger
     * /users/{username}/groups/add/{name}:
     *   get:
     *     tags:
     *       - Users / Groups
     *     summary: Adiciona um grupo ao usuario
     *     description:
     *     operationId: getUsersById
     *     parameters:
     *       - name: username
     *         in: path
     *         description: Name
     *         required: true
     *         schema:
     *           type: string
     *           example: me@rodrigo3d.com
     *     responses:
     *       200:
     *         description: successful operation
     *       400:
     *         description: Invalid status value
     *       404:
     *         description: not found
     */
    this.router.get(
      '/:username/groups/add/:name',
      this.usersController.addUserGroup.bind(this.usersController)
    )

    /**
     * @swagger
     * /users/{username}/groups/remove/{name}:
     *   get:
     *     tags:
     *       - Users / Groups
     *     summary: Remove um grupo ao usuario
     *     description:
     *     operationId: getUsersById
     *     parameters:
     *       - name: username
     *         in: path
     *         description: Name
     *         required: true
     *         schema:
     *           type: string
     *           example: me@rodrigo3d.com
     *     responses:
     *       200:
     *         description: successful operation
     *       400:
     *         description: Invalid status value
     *       404:
     *         description: not found
     */
    this.router.get(
      '/:username/groups/remove/:name',
      this.usersController.removeUserGroup.bind(this.usersController)
    )
  }

  getRouter(): Router {
    return this.router
  }
}
// {
//   "username": "me@rodrigo3d.com",
//   "attributes": [
//     { "Name": "gender", "Value": "Female" },
//     { "Name": "given_name", "Value": "Maria" },
//     { "Name": "locale", "Value": "pt-BR" },
//     { "Name": "middle_name", "Value": "Fernanda" },
//     { "Name": "name", "Value": "Maria Fernanda Silva" },
//     { "Name": "nickname", "Value": "Mari" },
//     { "Name": "phone_number", "Value": "+5511999998888" },
//     { "Name": "phone_number_verified", "Value": "true" },
//     { "Name": "picture", "Value": "https://example.com/profile/mariasilva.jpg" },
//     { "Name": "preferred_username", "Value": "mariasilva90" },
//     { "Name": "profile", "Value": "https://example.com/users/mariasilva" },
//     { "Name": "updated_at", "Value": "1691068800" },
//     { "Name": "website", "Value": "https://mariasilva.dev" },
//     { "Name": "zoneinfo", "Value": "America/Sao_Paulo" },
//     { "Name": "custom:role", "Value": "superadmin" }
//   ]
// }
