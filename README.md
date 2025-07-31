# Banking-client-service

## Descrição

- Este serviço é responsável pela gestão de operações para as entidades Cliente e Conta, além de gerenciar a autenticação JWT. </br></br>
De forma resumida, o serviço é totalmente síncrono, devido à simplicidade das operações realizadas.

## Tecnologias utilizadas

- NestJS (TypeScript)

- Docker / Docker Compose

- postgres

- Prisma (ORM)

## Arquitetura do serviço

- Esse serviço utiliza a arquitetura modular baseada no domínio (padrão nest) provomento uma boa escalabilidade da aplicação com modulos desacoplados. 

## Comunicação entre os serviços

- HTTP: O banking-client-service Expoe interfaces para serem consumidas por outros serviços de forma eficiente.

## Swagger

- link 

## Inicialização da aplicação 
 
### 1. Requisitos  
 - docker
 - docker compose
### 2. Estrutura de rede
 - Foi utilizado uma rede personalizada no docker chamada <strong> loomi_network</strong> para comunicação entre os containers essa rede faz com que todos os arquivos docker-compose.yml se conectem de forma eficiente favorecendo a arquitetura distribuida.  
 
### 3. Como iniciar o projeto

 1. Clonar o projeto

  ```bash
  git clone https://github.com/Dev-LucasMelo/banking-client-service.git
  ```
 2. Acessar diretorio 
  
  ```bash
  cd banking-client-service
  ```

3. iniciar contêineres com Docker Compose:
 
  ```bash
  docker-compose up --build
  ```

4. Acessar interface: 

  ```bash
  http://localhost:5000/
  ```

### Observação Importante
- É necessário garantir que a rede local <strong> loomi_network</strong> exista, para criar a rede basta rodar no terminal: 

  ```bash
  docker network create --driver bridge loomi_network
  ```