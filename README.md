# terms-challenge1
Desafio solicitado pela equipe da SimpleAds para preenchimento de vaga DEV

## Funcionamento da Aplicação
A aplicação possui dois campos de pesquisa:

* Um para Salvar termos
* E um para Pesquisar termos

A lateral direita é separada para mostrar os resultados das pesquisas do usuário.

### Regras de negócio
* Toda pesquisa deve ser feita dentro do próprio banco de dados;
* Os termos solicitados pelo usuário devem ser consumidos da endpoint disponibilizada.

## Ferramentas usadas na aplicação
* NodeJs + Typescript
* NextJs
* Postgres
* PrismaIO
* React-toastfy
* Axios
e outras...

## Instruções de uso
1. Clone o repositório no github
   > Verifique se as portas 3000 | 5432 estão liberadas
2. Execute os comandos "yarn" e depois "docker compose up" no diretório raiz do projeto;
   
   > Esse comando irá construir e configurar o app e o banco de dados Postgres
3. Acesse http://localhost:3000
4. Teste a aplicação.

Acesse a rota http://localhost:3000/dump para popular o banco de dados com os seguintes termos:
>[arroz, matrix, tesoura, manga, pitomba, maranhao, hungria, harry, jumper, paz, aprovacao, como, dev]
