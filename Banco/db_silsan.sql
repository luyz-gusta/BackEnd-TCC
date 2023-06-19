create database db_avicultura_silsan;

use db_avicultura_silsan;

create table tbl_lojista(
	id int not null auto_increment primary key,
    nome varchar(80) not null,
    email varchar(255) not null,
    senha varchar(270) not null,
    status_lojista bit not null default 1,
    
    unique index(id)
);

create table tbl_usuario(
	id int not null auto_increment primary key,
    nome varchar(80) not null,
    telefone varchar(15),
    email varchar(255) not null,
    senha varchar(270) not null,
    status_usuario bit not null default 1,
    
    unique index(id)
);

create table tbl_produto(
	id int not null auto_increment primary key,
    nome varchar(100) not null,
    descricao text not null,
    peso int not null,
    cupom varchar(15) not null,
    url text not null,
    status_produto bit not null default 1,
    id_lojista int not null,
    
    constraint FK_Lojista_Produto
    foreign key (id_lojista)
    references tbl_lojista(id),
    
    unique index(id)
);

insert into tbl_lojista(
	nome,
    email,
    senha
) values (
	'Gustavo Tenorio',
    '11940028922',
    md5('123456')
);

insert into tbl_lojista(
	nome,
    email,
    senha
) values (
	'Joao',
    '11989224002',
    md5('654321')
);

insert into tbl_produto(
    nome,
    descricao,
    peso,
    cupom,
    url,
    id_lojista
) values (
      'Ração Cachorro - Special Dog Adulto',
      'Comida pra cachorro',
	   15.5,
      'BCSF24',
      'https://polipet.fbitsstatic.net/img/p/racao-pedigree-nutricao-essencial-para-cachorros-adultos-carne-15-0kg-90648/284634.jpg?w=430&h=430&v=no-change&qs=ignore',
	  1
);

insert into tbl_produto(
    nome,
    descricao,
    peso,
    cupom,
    url,
    id_lojista
) values (
      'Ração Cachorro - Golden Seleção Natural',
      'Comida pra cachorro, mini golden',
	   19,
      'HGJI36',
      'https://images.tcdn.com.br/img/img_prod/1023012/racao_para_cachorro_filhote_racas_mini_golden_selecao_natural_frango_e_arroz_1kg_1251_1_50c343993b27180f461c4887bf388b19.jpg',
	  2
);

insert into tbl_produto(
    nome,
    descricao,
    peso,
    cupom,
    url,
    id_lojista
) values (
      'Ração Whiskas Carne para Gatos Adultos Castrados',
      'Comida pra gato',
	   10.1,
      'LSPG42',
      'https://www.petlove.com.br/images/products/258569/product/RAOWHI_4.JPG?1658246240',
	  1
);

select * from tbl_produto;

select 
	produto.id, 
    produto.nome as nome_produto, 
    produto.descricao as descricao_produto, 
    produto.peso as peso_produto,
    produto.cupom as cupom_produto,
    produto.url as url_produto,
    produto.status_produto,
    produto.id_lojista,
    lojista.nome as nome_lojista,
    lojista.email as email_lojista
from tbl_produto as produto
	inner join tbl_lojista as lojista
		on produto.id_lojista = lojista.id;


