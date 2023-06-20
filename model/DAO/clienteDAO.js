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

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()

const mdlSelectAllClientes = async () => {
    let sql = `
    select 
	    cliente.id as id_cliente,
        cliente.nome,
        cliente.telefone,
        date_format(cliente.data_nascimento, '%Y-%m-%d') as data_nascimento,  
        cliente.id_usuario,
        usuario.email,
        status_usuario.nivel
    from tbl_cliente as cliente
    	inner join tbl_usuario as usuario 
		    on cliente.id_usuario = usuario.id
	    inner join tbl_status_usuario as status_usuario 
			on usuario.id_status_usuario = status_usuario.id;`

    let rsCliente = await prisma.$queryRawUnsafe(sql)

    if(rsCliente.length > 0){
        return rsCliente
    }else{
        return false
    }
}

module.exports = {
   mdlSelectAllClientes
}