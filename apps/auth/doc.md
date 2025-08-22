| Categoria                                 | Função                           | Descrição                                                         |
| ----------------------------------------- | -------------------------------- | ----------------------------------------------------------------- |
| Admin / Usuários                          | AdminCreateUser                  | Cria um novo usuário no User Pool.                                |
| Admin / Usuários                          | AdminDeleteUser                  | Remove um usuário do User Pool.                                   |
| Admin / Usuários                          | AdminUpdateUserAttributes        | Atualiza os atributos de um usuário como administrador.           |
| Admin / Usuários                          | AdminGetUser                     | Recupera informações detalhadas sobre um usuário.                 |
| Admin / Usuários                          | AdminConfirmSignUp               | Confirma o cadastro de um usuário (ignora código de verificação). |
| Admin / Usuários                          | AdminDeleteUserAttributes        | Remove atributos específicos de um usuário.                       |
| Admin / Usuários                          | AdminDisableProviderForUser      | Desativa provedor de identidade para um usuário.                  |
| Admin / Usuários                          | AdminSetUserPassword             | Define ou altera a senha de um usuário.                           |
| Admin / Usuários                          | AdminResetUserPassword           | Reseta a senha para valor temporário.                             |
| Admin / Usuários                          | AdminUserGlobalSignOut           | Desloga o usuário de todas as sessões ativas.                     |
| Admin / Usuários                          | AdminAddUserToGroup              | Adiciona um usuário a um grupo.                                   |
| Admin / Usuários                          | AdminRemoveUserFromGroup         | Remove um usuário de um grupo.                                    |
| Admin / Usuários                          | AdminListGroupsForUser           | Lista grupos que o usuário pertence.                              |
| Usuário / Atributos                       | UpdateUserAttributes             | Atualiza atributos do usuário autenticado.                        |
| Usuário / Atributos                       | DeleteUserAttributes             | Remove atributos do usuário autenticado.                          |
| Usuário / Atributos                       | GetUserAttributeVerificationCode | Envia código de verificação para atributo (email, telefone).      |
| Usuário / Atributos                       | VerifyUserAttribute              | Verifica um atributo com código.                                  |
| Usuário / Autenticação                    | SignUp                           | Registra um novo usuário.                                         |
| Usuário / Autenticação                    | ConfirmSignUp                    | Confirma cadastro com código.                                     |
| Usuário / Autenticação                    | ResendConfirmationCode           | Reenvia código de confirmação.                                    |
| Usuário / Autenticação                    | ForgotPassword                   | Inicia recuperação de senha.                                      |
| Usuário / Autenticação                    | ConfirmForgotPassword            | Confirma troca de senha com código.                               |
| Usuário / Autenticação                    | InitiateAuth                     | Inicia login / autenticação.                                      |
| Usuário / Autenticação                    | RespondToAuthChallenge           | Responde a desafios (ex: MFA).                                    |
| Usuário / Autenticação                    | ChangePassword                   | Altera senha autenticado.                                         |
| Usuário / Autenticação                    | GlobalSignOut                    | Encerra todas as sessões do usuário.                              |
| Usuário / Autenticação                    | GetUser                          | Recupera dados do usuário autenticado.                            |
| Admin / Autenticação e Segurança          | AdminInitiateAuth                | Inicia autenticação como admin.                                   |
| Admin / Autenticação e Segurança          | AdminRespondToAuthChallenge      | Responde desafio de autenticação (MFA, etc).                      |
| Admin / Autenticação e Segurança          | AdminSetUserMFAPreference        | Configura MFA para usuário.                                       |
| Admin / Autenticação e Segurança          | AssociateSoftwareToken           | Associa token de MFA software.                                    |
| Admin / Autenticação e Segurança          | VerifySoftwareToken              | Verifica token MFA software.                                      |
| Admin / Autenticação e Segurança          | ConfirmDevice                    | Confirma dispositivo confiável.                                   |
| Admin / Autenticação e Segurança          | AdminUpdateDeviceStatus          | Ativa/desativa dispositivo do usuário.                            |
| Admin / Autenticação e Segurança          | AdminUpdateAuthEventFeedback     | Atualiza feedback sobre eventos suspeitos.                        |
| Admin / Autenticação e Segurança          | SetRiskConfiguration             | Configura políticas de risco do User Pool.                        |
| Admin / Autenticação e Segurança          | DescribeRiskConfiguration        | Recupera configurações de risco.                                  |
| Admin / Autenticação e Segurança          | UpdateAuthEventFeedback          | Atualiza feedback (usuário).                                      |
| Admin / Grupos                            | CreateGroup                      | Cria um grupo.                                                    |
| Admin / Grupos                            | DeleteGroup                      | Remove um grupo.                                                  |
| Admin / Grupos                            | UpdateGroup                      | Atualiza dados do grupo.                                          |
| Admin / Grupos                            | GetGroup                         | Recupera detalhes do grupo.                                       |
| Admin / Grupos                            | ListGroups                       | Lista grupos do User Pool.                                        |
| Admin / Grupos                            | ListUsersInGroup                 | Lista usuários de um grupo.                                       |
| Admin / Provedores de Identidade          | CreateIdentityProvider           | Cria provedor de identidade (Google, etc).                        |
| Admin / Provedores de Identidade          | DeleteIdentityProvider           | Remove provedor.                                                  |
| Admin / Provedores de Identidade          | UpdateIdentityProvider           | Atualiza provedor.                                                |
| Admin / Provedores de Identidade          | DescribeIdentityProvider         | Recupera detalhes do provedor.                                    |
| Admin / Provedores de Identidade          | ListIdentityProviders            | Lista todos os provedores.                                        |
| Admin / Provedores de Identidade          | GetIdentityProviderByIdentifier  | Recupera provedor por identificador.                              |
| Admin / Configuração User Pool e Clientes | UpdateUserPool                   | Atualiza configurações do User Pool.                              |
| Admin / Configuração User Pool e Clientes | DescribeUserPool                 | Recupera detalhes do User Pool.                                   |
| Admin / Configuração User Pool e Clientes | UpdateUserPoolClient             | Atualiza cliente do User Pool (app client).                       |
| Admin / Configuração User Pool e Clientes | DescribeUserPoolClient           | Recupera detalhes do cliente.                                     |
| Admin / Configuração User Pool e Clientes | ListUserPoolClients              | Lista clientes do User Pool.                                      |
| Admin / Configuração User Pool e Clientes | GetSigningCertificate            | Obtém certificado para validar tokens JWT.                        |
| Admin / Configuração User Pool e Clientes | GetUICustomization               | Recupera personalização da UI.                                    |
| Admin / Configuração User Pool e Clientes | GetUserPoolMfaConfig             | Recupera configurações MFA do User Pool.                          |
| Admin / Importação de Usuários            | StartUserImportJob               | Inicia job de importação de usuários.                             |
| Admin / Importação de Usuários            | StopUserImportJob                | Para job de importação em andamento.                              |
| Admin / Importação de Usuários            | DescribeUserImportJob            | Recupera detalhes do job.                                         |
| Admin / Importação de Usuários            | ListUserImportJobs               | Lista jobs de importação.                                         |
| Admin / Importação de Usuários            | GetCSVHeader                     | Retorna cabeçalho CSV para importação.                            |
| Usuário / Dispositivos                    | ListDevices                      | Lista dispositivos do usuário.                                    |
| Usuário / Dispositivos                    | GetDevice                        | Recupera dados de um dispositivo.                                 |
| Usuário / Dispositivos                    | ForgetDevice                     | Remove dispositivo confiável.                                     |
| Usuário / Dispositivos                    | UpdateDeviceStatus               | Atualiza status de um dispositivo.                                |
| Sessões e Tokens                          | GlobalSignOut                    | Encerra todas as sessões do usuário.                              |
| Sessões e Tokens                          | AdminUserGlobalSignOut           | Desloga usuário de todas as sessões (admin).                      |
| Sessões e Tokens                          | RevokeToken                      | Revoga tokens de acesso.                                          |
