/************************************************************************************************
 * Objetivo: Responsável pela regra de negócio referente ao CRUD de CLIENTE
 * Autor: Luiz Gustavo
 * Data: 20/06/2023
 * Versão: 1.0
************************************************************************************************/

/**********************************************************
* Métodos com inicio 'ctl' são funcões do controller
* e
* Métodos com inicio 'mdl' são funcões do model
**********************************************************/

var message = require('./modulo/config.js')
var clienteDao = require('../model/DAO/clienteDAO.js')

//Retorna todos os clientes
const ctlGetClientes = async () => {
    let dadosClientesJSON = {}

    //Chama a função do arquivo DAO que irá retornar todos os resgistros do DB
    let dadosClientes = await clienteDao.mdlSelectAllClientes()

    if (dadosClientes) {
        dadosClientesJSON = {
            status: message.SUCCESS_REQUEST.status,
            message: message.SUCCESS_REQUEST.message,
            quantidade: dadosClientes.length,
            clientes: dadosClientes
        }
        return dadosClientesJSON
    } else {
        return message.ERROR_REGISTER_NOT_FOUND
    }
}

module.exports = {
    ctlGetClientes
}