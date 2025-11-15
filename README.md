# API de Filmes

Esta é uma API para gerenciamento de filmes, permitindo que os usuários se cadastrem, façam login e gerenciem seus próprios catálogos de filmes.

## Sumário

- [Visão Geral do Projeto](#visão-geral-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Como Iniciar o Projeto com Docker](#como-iniciar-o-projeto-com-docker)
- [Referência da API](#referência-da-api)
  - [Autenticação](#autenticação)
    - [POST /register](#post-register)
    - [POST /login](#post-login)
  - [Filmes](#filmes)
    - [GET /](#get-)
    - [GET /:id](#get-id)
    - [POST /](#post-)
    - [PUT /:id](#put-id)
    - [DELETE /:id](#delete-id)
- [Estrutura do Banco de Dados](#estrutura-do-banco-de-dados)
  - [Tabela `users`](#tabela-users)
  - [Tabela `movies`](#tabela-movies)

## Visão Geral do Projeto

A API oferece um sistema completo para que os usuários possam gerenciar uma coleção pessoal de filmes. As funcionalidades incluem:

- **Autenticação de Usuários:** Sistema seguro de registro e login com JWT.
- **Gerenciamento de Filmes:** CRUD completo para filmes, onde cada usuário gerencia apenas sua própria coleção.

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:

- **Docker:** Para containerização da aplicação e do banco de dados.
- **Docker Compose:** Para orquestrar os containers da aplicação.

### Instalando o Docker

O Docker é uma plataforma que permite criar, testar e implantar aplicações em containers. Para instalá-lo, siga as instruções para o seu sistema operacional:

- **Windows:** [Instalar Docker Desktop no Windows](https://docs.docker.com/desktop/install/windows-install/)
- **macOS:** [Instalar Docker Desktop no Mac](https://docs.docker.com/desktop/install/mac-install/)
- **Linux:** [Instalar Docker Engine no Linux](https://docs.docker.com/engine/install/)

Após a instalação, você pode verificar se o Docker está funcionando corretamente com o comando:

```bash
docker --version
Docker version 20.10.17, build 100c701
```

E para o Docker Compose:

```bash
docker-compose --version
Docker Compose version v2.11.1
```

## Como Iniciar o Projeto com Docker

Com o Docker e o Docker Compose instalados, siga os passos abaixo para iniciar a aplicação:

1. **Clone o repositório do projeto:**

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_DIRETORIO>
   ```

2. **Inicie os containers com Docker Compose:**

   O comando a seguir irá construir a imagem da API, iniciar um container para a API e outro para o banco de dados PostgreSQL.
   Lembrando que para iniciar o container, o aplicativo do docker precisa estar instalado e aberto em seu computador.

   ```bash
   docker-compose up --build
   ```

   - O `-d` (opcional) executa os containers em segundo plano.
   - O `--build` força a reconstrução da imagem, o que é útil se você fez alterações no `Dockerfile` ou no código-fonte.

3. **Acesse a API:**

   A API estará disponível em `http://localhost:8080`.

## Referência da API

### Autenticação

A autenticação é baseada em JSON Web Tokens (JWT). Para acessar as rotas protegidas, você precisa enviar um token de autorização no cabeçalho `Authorization`.

O token deve ser enviado no formato `Bearer {token}`.

#### POST /register

Cria um novo usuário.

- **Corpo da Requisição:** `application/json`

  ```json
  {
    "name": "Seu Nome",
    "email": "seu@email.com",
    "password": "sua_senha"
  }
  ```

- **Resposta de Sucesso (201 Created):**

  ```json
  {
    "id": "uuid-do-usuario",
    "name": "Seu Nome",
    "email": "seu@email.com"
  }
  ```

- **Respostas de Erro:**
  - `400 Bad Request`: Se os dados fornecidos forem inválidos.
  - `409 Conflict`: Se o e-mail já estiver em uso.

#### POST /login

Autentica um usuário e retorna um token JWT.

- **Corpo da Requisição:** `application/json`

  ```json
  {
    "email": "seu@email.com",
    "password": "sua_senha"
  }
  ```

- **Resposta de Sucesso (200 OK):**

  ```json
  {
    "token": "seu-jwt-token"
  }
  ```

- **Respostas de Erro:**
  - `401 Unauthorized`: Se as credenciais estiverem incorretas.

### Filmes

As rotas a seguir requerem autenticação. O token JWT deve ser enviado no cabeçalho `Authorization`.

#### GET /

Retorna todos os filmes cadastrados pelo usuário autenticado.

- **Cabeçalhos:**

  - `Authorization: Bearer {token}`

- **Resposta de Sucesso (200 OK):**

  ```json
  [
    {
      "id": "uuid-do-filme",
      "userId": "uuid-do-usuario",
      "url": "http://example.com/poster.jpg",
      "title": "Título do Filme",
      "genre": "Gênero",
      "age": "12",
      "duration": "120 min",
      "points": "4.5",
      "description": "Descrição do filme.",
      "release": "2023",
      "createdAt": "2023-10-27T10:00:00.000Z",
      "updatedAt": "2023-10-27T10:00:00.000Z"
    }
  ]
  ```

#### GET /:id

Retorna um filme específico pelo seu ID.

- **Cabeçalhos:**

  - `Authorization: Bearer {token}`

- **Parâmetros da URL:**

  - `id` (string, obrigatório): O ID do filme.

- **Resposta de Sucesso (200 OK):**

  ```json
  {
    "id": "uuid-do-filme",
    "userId": "uuid-do-usuario",
    "url": "http://example.com/poster.jpg",
    "title": "Título do Filme",
    "genre": "Gênero",
    "age": "12",
    "duration": "120 min",
    "points": "4.5",
    "description": "Descrição do filme.",
    "release": "2023",
    "createdAt": "2023-10-27T10:00:00.000Z",
    "updatedAt": "2023-10-27T10:00:00.000Z"
  }
  ```

- **Respostas de Erro:**
  - `404 Not Found`: Se o filme não for encontrado.

#### POST /

Adiciona um novo filme ao catálogo do usuário.

- **Cabeçalhos:**

  - `Authorization: Bearer {token}`

- **Corpo da Requisição:** `application/json`

  ```json
  {
    "url": "http://example.com/poster.jpg",
    "title": "Título do Filme",
    "genre": "Gênero",
    "age": "12",
    "duration": "120 min",
    "points": "4.5",
    "description": "Descrição do filme.",
    "release": "2023"
  }
  ```

- **Resposta de Sucesso (201 Created):**

  ```json
  {
    "id": "uuid-do-filme",
    "userId": "uuid-do-usuario",
    "url": "http://example.com/poster.jpg",
    "title": "Título do Filme",
    "genre": "Gênero",
    "age": "12",
    "duration": "120 min",
    "points": "4.5",
    "description": "Descrição do filme.",
    "release": "2023",
    "createdAt": "2023-10-27T10:00:00.000Z",
    "updatedAt": "2023-10-27T10:00:00.000Z"
  }
  ```

#### PUT /:id

Atualiza os dados de um filme existente.

- **Cabeçalhos:**

  - `Authorization: Bearer {token}`

- **Parâmetros da URL:**

  - `id` (string, obrigatório): O ID do filme.

- **Corpo da Requisição:** `application/json`

  ```json
  {
    "url": "http://example.com/novo-poster.jpg",
    "title": "Novo Título do Filme",
    "genre": "Novo Gênero",
    "age": "14",
    "duration": "130 min",
    "points": "4.8",
    "description": "Nova descrição do filme.",
    "release": "2024"
  }
  ```

- **Resposta de Sucesso (200 OK):**

  ```json
  {
    "message": "Filme atualizado com sucesso"
  }
  ```

- **Respostas de Erro:**
  - `404 Not Found`: Se o filme não for encontrado.

#### DELETE /:id

Deleta um filme do catálogo do usuário.

- **Cabeçalhos:**

  - `Authorization: Bearer {token}`

- **Parâmetros da URL:**

  - `id` (string, obrigatório): O ID do filme.

- **Resposta de Sucesso (200 OK):**

  ```json
  {
    "message": "Filme deletado com sucesso"
  }
  ```

- **Respostas de Erro:**
  - `404 Not Found`: Se o filme não for encontrado.

## Estrutura do Banco de Dados

O projeto utiliza o PostgreSQL como banco de dados. O schema é definido pelos seguintes modelos:

### Tabela `users`

| Coluna     | Tipo     | Descrição                 |
| :--------- | :------- | :------------------------ |
| `id`       | `UUID`   | Chave primária do usuário |
| `name`     | `STRING` | Nome do usuário           |
| `email`    | `STRING` | E-mail do usuário (único) |
| `password` | `STRING` | Senha do usuário (hash)   |

### Tabela `movies`

| Coluna        | Tipo     | Descrição                      |
| :------------ | :------- | :----------------------------- |
| `id`          | `UUID`   | Chave primária do filme        |
| `userId`      | `UUID`   | Chave estrangeira para `users` |
| `url`         | `STRING` | URL do pôster do filme         |
| `title`       | `STRING` | Título do filme                |
| `genre`       | `STRING` | Gênero do filme                |
| `age`         | `STRING` | Classificação etária           |
| `duration`    | `STRING` | Duração do filme               |
| `points`      | `STRING` | Pontuação do filme             |
| `description` | `STRING` | Descrição do filme             |
| `release`     | `STRING` | Ano de lançamento              |
| `createdAt`   | `DATE`   | Data de criação do registro    |
| `updatedAt`   | `DATE`   | Data da última atualização     |
