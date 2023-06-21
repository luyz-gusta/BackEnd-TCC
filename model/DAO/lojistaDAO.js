/************************************************************************************************
 * Objetivo: Responsável pela regra de negócio referente ao CRUD de LOJISTA
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

const mdlSelectAllLojista = async () => {
    let sql = `
    select 
	    lojista.id as id_lojista,
        lojista.nome,
        lojista.telefone,
        lojista.id_usuario,
        usuario.email,
        status_usuario.nivel
    from tbl_lojista as lojista
    	inner join tbl_usuario as usuario 
	    	on lojista.id_usuario = usuario.id
	    inner join tbl_status_usuario as status_usuario 
			on usuario.id_status_usuario = status_usuario.id;`

    let rsLojista = await prisma.$queryRawUnsafe(sql)

    if(rsLojista.length > 0){
        return rsLojista
    }else{
        return false
    }
}

const mdlSelectClienteByID = async (id) => {
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
			on usuario.id_status_usuario = status_usuario.id
    where cliente.id = ${id};`

    let rsCliente = await prisma.$queryRawUnsafe(sql)

    if(rsCliente.length > 0){
        return rsCliente
    }else{
        return false
    }
}

//Retorna o ultimo id inserido no BD
const mdlSelectLastId = async function (){

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
			on usuario.id_status_usuario = status_usuario.id order by id desc limit 1;`

    let rsStatusUsuario = await prisma.$queryRawUnsafe(sql);

    if (rsStatusUsuario.length > 0){
        return rsStatusUsuario;
    } else {
        return false;
    }
}



module.exports = {
   mdlSelectAllLojista
}