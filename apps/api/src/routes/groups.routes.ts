import { Router } from 'express'
import { GroupsController } from '../controllers/groups.controller'
import { validate } from '../middlewares/validateHandler'
import { createGroupSchema, deleteGroupSchema, updateGroupSchema } from '../schemas/groups.schema'

export class GroupsRoutes {
  private router: Router
  private groupsController: GroupsController

  constructor() {
    this.router = Router()
    this.groupsController = new GroupsController()
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    /**
     * @swagger
     * /groups:
     *   post:
     *     tags:
     *       - Groups
     *     summary: Criar grupo
     *     description: Cria um novo grupo em um User Pool
     *     operationId: createGroup
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
     *     responses:
     *       200:
     *         description: Requisição bem-sucedida
     *       201:
     *         description: Convidado criado com sucesso
     *       400:
     *         description: Dados inválidos
     */
    this.router.post(
      '/',
      validate(createGroupSchema),
      this.groupsController.createGroup.bind(this.groupsController)
    )
    /**
     * @swagger
     * /groups:
     *   get:
     *     tags:
     *       - Groups
     *     summary: Listar todos os grupos
     *     description: Lista todos os grupos do User Pool
     *     operationId: getAllGroups
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
    this.router.get('/', this.groupsController.getAllGroups.bind(this.groupsController))
    /**
     * @swagger
     * /groups/{name}:
     *   put:
     *     tags:
     *       - Groups
     *     summary: Atualizar grupo
     *     description: Altera dados como descrição ou precedência do grupo
     *     operationId: updateGroups
     *     parameters:
     *       - name: name
     *         in: path
     *         description: name
     *         required: true
     *         schema:
     *           type: string
     *           example: 'fake-group'
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *           example:
     *             description: 'Nenhum total'
     *             precedence: 1
     *     responses:
     *       200:
     *         description: Requisição bem-sucedida
     *       201:
     *         description: Convidado criado com sucesso
     *       400:
     *         description: Dados inválidos
     */
    this.router.put(
      '/:name',
      validate(updateGroupSchema),
      this.groupsController.updateGroup.bind(this.groupsController)
    )
    /**
     * @swagger
     * /groups/{name}:
     *   delete:
     *     tags:
     *       - Groups
     *     summary: Deletar grupo
     *     description: Remove um grupo | const forbidden = ['superadmin', 'admin', 'editor', 'viewer', 'guest', 'manager', 'user']
     *     operationId: deleteGroups
     *     parameters:
     *       - name: name
     *         in: path
     *         description: Name
     *         required: true
     *         schema:
     *           type: string
     *           example: fake-group
     *     responses:
     *       200:
     *         description: successful operation
     *       400:
     *         description: Invalid status value
     *       404:
     *         description: not found
     */
    this.router.delete(
      '/:name',
      validate(deleteGroupSchema),
      this.groupsController.deleteGroup.bind(this.groupsController)
    )
    /**
     * @swagger
     * /groups/{name}:
     *   get:
     *     tags:
     *       - Groups
     *     summary: Obter grupo
     *     description: Recupera informações de um grupo específico
     *     operationId: getGroupsById
     *     parameters:
     *       - name: name
     *         in: path
     *         description: Name
     *         required: true
     *         schema:
     *           type: string
     *           example: fake-group
     *     responses:
     *       200:
     *         description: successful operation
     *       400:
     *         description: Invalid status value
     *       404:
     *         description: not found
     */
    this.router.get('/:name', this.groupsController.getGroupById.bind(this.groupsController))
  }

  getRouter(): Router {
    return this.router
  }
}

// 📋 Roles mais comuns:
// Admin / Administrator

// Tem acesso total ao sistema.

// Pode gerenciar usuários, permissões, configurações, conteúdo, etc.

// User / Regular User / Member

// Usuário comum.

// Tem acesso apenas às funcionalidades básicas destinadas ao público geral.

// Moderator

// Pode revisar, aprovar ou excluir conteúdo gerado por usuários.

// Geralmente usado em fóruns, redes sociais, ou plataformas com UGC (user-generated content).

// Editor

// Pode criar, editar e publicar conteúdo.

// Normalmente usado em CMSs (como WordPress).

// Author

// Pode criar e gerenciar apenas seus próprios conteúdos.

// Mais limitado que o Editor.

// Viewer / Reader / Guest

// Apenas visualiza informações.

// Pode ou não estar autenticado.

// Super Admin / Root

// Acima do Admin comum.

// Pode administrar múltiplas instâncias/sistemas (ex: multi-tenant apps).

// Manager

// Intermediário entre Admin e User.

// Pode gerir usuários ou recursos de um escopo específico.

// Contributor

// Pode criar conteúdo, mas precisa de aprovação antes da publicação.

// Guest / Anonymous

// Usuário não autenticado.

// Acesso extremamente restrito.
