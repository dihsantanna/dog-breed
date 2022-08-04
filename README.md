# Desafio Dog Breed

## Objetivos desse desafio

Esperamos entender melhor os seguintes pontos:

* Como você organiza e documenta o projeto
* Seu estilo de trabalho e código
* Seu nível de conhecimento sobre as ferramentas requeridas

## Ferramentas sugeridas

* React+Typescript
* IoC
* Testes
* Linter

## Instruções

Esperamos que você crie um app que capture os dados da [nossa api de raças de cachorro](https://dogbreed-api.q9.com.br), e apresente numa interface cumprindo os itens abaixo.

### Página de Cadastro

* Crie uma página `Register` com um campo de email, e autentique o usuário postando o email no [endpoint de cadastro/login](https://dogbreed-api.q9.com.br/register).
* A chamada na API retornará um `token` JWT, que deverá ser armazenado para ser utilizada nas chamadas seguintes.
* Após receber e armazenar o `token`, redirecione para a página de `List`.
* A página de `Register` é a única página de acesso público. As demais rotas são todas privadas e requerem o envio do token conforme a documentação da API abaixo

### Página de Lista de Cachorros

* No carregamento inicial da página de `List`, deverá ser feita uma chamada no [endpoint de list](https://dogbreed-api.q9.com.br/list).
* A página de `List` deverá ter um menu com quatro rotas - `chihuahua`, `husky`, `labrador` e `pug`.
* Cada rota, ao ser clicada, deve realizar uma chamada no [endpoint de list](https://dogbreed-api.q9.com.br/list), passando a respectiva `breed`. Quando não especificada, a `breed` default é `chihuahua`.

### Página de Foto

* Ao clicar em uma foto, a foto deverá ser ampliada e destacada dos demais itens da página, com um overlay.

## Documentação da API Dog Breed

URL da API: [`https://dogbreed-api.q9.com.br`](https://dogbreed-api.q9.com.br)

Todas as requisições devem ser feitas com a header Content-Type: application/json.
As respostas são codificadas em JSON.

### POST /register

#### Cadastro/Login de usuário

```bash
POST /register
```

```bash
curl "https://dogbreed-api.q9.com.br/register" \
-H "Content-Type: application/json" \
-d '{ "email": "name@domain.com" }'
```

### GET /list

#### Listas de cachorros

```bash
GET /list
```

```bash
curl "https://dogbreed-api.q9.com.br/list" \
-H "Authorization: $TOKEN" \
-H "Content-Type: application/json"
```

##### Querystring

##### ?breed

**Default**: `chihuahua`<br/>
**Type**: `string`<br/>
**Options**: `chihuahua`, `husky`, `pug`, `labrador`