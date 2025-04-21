# GymPass Style App

Este é um projeto de exemplo inspirado no estilo do GymPass, desenvolvido com foco nos princípios do **SOLID** e boas práticas de desenvolvimento. A aplicação permite gerenciar academias, check-ins de usuários e autenticação, utilizando tecnologias modernas e escaláveis.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**: Plataforma de execução para JavaScript no lado do servidor.
- **Fastify**: Framework web rápido e eficiente para construção de APIs.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Prisma**: ORM moderno para manipulação de banco de dados.
- **PostgreSQL**: Banco de dados relacional utilizado para persistência de dados.
- **Zod**: Biblioteca para validação e parsing de esquemas.
- **Vitest**: Framework de testes para garantir a qualidade do código.
- **Supertest**: Biblioteca para testes de integração de APIs.
- **bcryptjs**: Biblioteca para hashing de senhas.
- **Day.js**: Biblioteca para manipulação de datas.
- **JWT (JSON Web Token)**: Utilizado para autenticação e autorização de usuários.
- **Docker**: Utilizado para configurar o ambiente de banco de dados no CI/CD.

---

## 📋 Requisitos Funcionais (RFs)

- [x] Deve ser possível se cadastrar.
- [x] Deve ser possível se autenticar.
- [x] Deve ser possível obter o perfil de um usuário logado.
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado.
- [x] Deve ser possível o usuário obter o seu histórico de check-ins.
- [x] Deve ser possível o usuário buscar academias próximas (até 10km).
- [x] Deve ser possível o usuário buscar academias pelo nome.
- [x] Deve ser possível o usuário realizar check-in em uma academia.
- [x] Deve ser possível validar o check-in de um usuário.
- [x] Deve ser possível cadastrar uma academia.

---

## 📜 Regras de Negócio (RNs)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado.
- [x] O usuário não pode fazer 2 check-ins no mesmo dia.
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia.
- [x] O check-in só pode ser validado até 20 minutos após ser criado.
- [x] O check-in só pode ser validado por administradores.
- [x] A academia só pode ser cadastrada por administradores.

---

## 📦 Requisitos Não-Funcionais (RNFs)

- [x] A senha do usuário precisa estar criptografada.
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL.
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página.
- [x] O usuário deve ser identificado por um JWT (JSON Web Token).

---

## 🛠️ Estrutura do Projeto

A estrutura do projeto foi organizada para seguir os princípios do **SOLID** e facilitar a escalabilidade e manutenção:

- **src/app.ts**: Configuração principal do servidor Fastify.
- **src/http/controllers**: Contém os controladores responsáveis por lidar com as requisições HTTP.
- **src/http/middlewares**: Middlewares para autenticação e autorização.
- **src/services**: Contém a lógica de negócios da aplicação.
- **src/repositories**: Implementações dos repositórios para manipulação de dados.
- **src/utils**: Funções utilitárias para testes e outras funcionalidades.

---

## 🧪 Testes

O projeto utiliza **Vitest** para testes unitários e de integração, garantindo a qualidade do código. Os testes end-to-end (E2E) são configurados para rodar no CI utilizando o banco de dados PostgreSQL.

### Comandos de Teste

- **Rodar todos os testes**:
  ```bash
  npm run test
  ```

- **Rodar testes em modo watch**:
  ```bash
  npm run test:watch
  ```

- **Rodar testes end-to-end**:
  ```bash
  npm run test:e2e
  ```

- **Gerar relatório de cobertura de testes**:
  ```bash
  npm run test:coverage
  ```

---

## 🐳 Configuração com Docker

O projeto utiliza Docker para configurar o banco de dados PostgreSQL no ambiente de desenvolvimento e CI/CD.

### Subir o Banco de Dados com Docker

```bash
docker run --name postgres -e POSTGRES_USER=docker -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=apisolid -p 5432:5432 -d postgres
```

---

## 👨‍💻 Autor

Desenvolvido por Alex da Costa. 🚀
