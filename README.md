
# Seja bem-vindo(a) ao Dog Breed App :grin:

Esta aplicação consiste em um site onde é possível ter acesso a variadas imagens de cães das raças `chihuahua`, `husky`, `labrador` e `pug`.

Caso queira testar a aplicação em produção acesse [este link](https://dogbreed-00.netlify.app/).

A API utilizada nesta aplicação foi a `DOG API` caso queira saber mais sobre ela ou ver sua documentação é só clicar [aqui](https://dog.ceo/dog-api/).




## Stacks utilizadas :wrench:

- [React](https://pt-br.reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/pt/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [Docker](https://www.docker.com/)
- [Figma](https://www.figma.com/)
- [Axios](https://axios-http.com/ptbr/)
- [ESLint](https://eslint.org/)
- [TDD](https://www.devmedia.com.br/test-driven-development-tdd-simples-e-pratico/18533)
- [Supabase](https://supabase.com/)


## Instalação

1 - Antes de mais nada, faça um git clone do repositório e entre na pasta do projeto, usando o comando abaixo em seu terminal:

```bash
  git clone git@github.com:dihsantanna/dog-breed.git && cd my-project
```

2 - Caso tenha o docker em sua maquina basta executar o comando abaixo, senão vá para o passo 3:

```bash
  npm run install:docker
```

  * Após utilizar a aplicação, para encerra o docker compose utilize o código
  ```bash
  npm run compose:down
```

** Caso tenha optado pelo docker o passo 3 (três) não se faz necessário.

3 - Renomeie o arquivo `.env.example` para `.env`. (Atenção os valores de variáveis utilizados disponibilizei para fins didáticos, todos eles funcionam, mas claro que em um ambiente realmente profissional eles não seriam divulgados) Você não precisa alterar nenhum valor.

```bash
  npm run install && npm run dev
```

4 - Para abrir a aplicação, pelo seu navegador, acesse [http://localhost:3000/](http://localhost:3000/)



## Rodando os testes

Para rodar os testes, é necessário ter rodado o comando `npm install` caso ainda não tenha rodado. Logo após rode o seguintes comandos:

Teste simples ui intuitiva

```bash
  npm test
```

Caso queira queira verificar os teste de forma mais intuitiva em seu navegador, utilize o seguinte código

```bash
  npm run test:ui
```

Caso queira ter acesso a cobertura dos testes, rode o comando

```bash
  npm run coverage
```

Para encerrar os testes, no terminal que está rodando aperte a tecla `Q`.


## Rodando o Linter

Para rodar o linter execute o comando

```bash
  npm run lint
```

## Figma

*O projeto foi baseado no modelo figma [dog-breed](https://www.figma.com/file/Ikoe1y6OSWMrYzxiHqaK9i/Dog-Breed?node-id=13%3A72) que eu projetei exclusivamente para este projeto.
