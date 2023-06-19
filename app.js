/**************************************************************************************
 *  Objetivo: API para integração entre back e banco de dados (GET, POST, PUT, DELETE)
 *  Autor: Luiz Gustavo
 *  Data: 19/06/2023
 *  Versão: 1.0
 **************************************************************************************/

/**
 * Express - dependencia para realizar requisições de API pelo protocolo HTTP 
 *      npm install express --save
 * 
 *  Cors - dependencia para gerenciar permissões de requisição da API
 *      npm install cors --save
 * 
 *  Body-Parser - dependencia que gerencia o corpo das resquisições 
 *      npm install body-parser --save
 **/

//Dependencia para criar as requisições de API
const express = require('express');

//Dependencia para gerenciar as permissões da API
const cors = require('cors');

//Dependencia para gerenciar o corpo das requisições da API
const bodyParser = require('body-parser');

//Cria o objeto app conforme a classe do express
const app = express()

app.use((request, response, next) => {
    //Define quem poderá acessar a api(* - Todos)
    response.header('Acess-Control-Allow-Origin', '*')

    //Define quais metodos serão utilizados na api
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    //Atribui as permissões ao cors
    app.use(cors())

    next()
})

//CRUD (Create, Read, Update e Delete)

/*****************************************************************************************************************
* Objetivo: API de controle de PRODUTOS
* Data: 19/06/2023
* Autor: Luiz Gustavo
* Versão: 1.0
******************************************************************************************************************/

/*
Instalação do PRISMA no projeto (biblioteca para conexão com Banco de Dados)
    npm install prisma --save
    npx prisma
    npx prisma init
    npm install @prisma/client --save

    npx prisma migrate dev  ###Serve para realizar o sincronismo entre o prisma e o Banco de Dados
*/

//Define que os dados que irão chegar no body da requisição será no padrao JSON
const bodyParserJson = bodyParser.json();

//Import do araquivo da controler que irá solicitar a model os do BD
var controllerProduto = require('./controller/controller_produto.js')

//EndPoint: Retorna todos os dados de produtos ou pelo id do lojista por query
app.get('/v1/avicultura-silsan/produto', cors(), async function (request, response) {
    let idLojista = request.query.idLojista

    if (idLojista) {
        let dadosProduto = await controllerProduto.getProdutoPeloIdLojista(idLojista)

        response.status(dadosProduto.status)
        response.json(dadosProduto)
    } else {
        let dadosProduto = await controllerProduto.getProdutos()

        response.status(dadosProduto.status)
        response.json(dadosProduto)
    }
})

//EndPoint: Retorna o produto filtrando pelo ID
app.get('/v1/avicultura-silsan/produto/:id', cors(), async function (request, response) {
    let idProduto = request.params.id

    let dadosProduto = await controllerProduto.getProdutoPeloId(idProduto)

    response.status(dadosProduto.status)
    response.json(dadosProduto)
})

//EndPoint: Insere um produto novo
app.post('/v1/avicultura-silsan/produto', cors(), bodyParserJson, async function (request, response) {
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosProdutos

        response.status(resultDadosAlunos.status)
        response.json(resultDadosAlunos)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//EndPoint: Atualiza um produto existente, filtrando pelo ID
app.put('/v1/avicultura-silsan/produto/:id', cors(), bodyParserJson, async function (request, response) {

})

//EndPoint: Exclui um produto, filtrando pelo ID
app.delete('/v1/avicultura-silsan/produto/:id', cors(), async function (request, response) {

})


app.listen(8080, () => console.log('Servidor aguardando requisições na porta 8080.'))
