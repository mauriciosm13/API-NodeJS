const roteador = require('express').Router();
const tabelaFornecedor = require('./tabelaFornecedor')
const Fornecedor = require('./Fornecedor');
const req = require('express/lib/request');

roteador.get('/', async (requisicao, resposta) => {
    const resultados = await tabelaFornecedor.listar();
    resposta.send(
        JSON.stringify(resultados)
    )
});

roteador.post('/', async (requisicao, resposta) => {
    const dadosRecebidos = requisicao.body
    const fornecedor = new Fornecedor(dadosRecebidos)
    await fornecedor.criar()
    resposta.send(
        JSON.stringify(fornecedor)
    )
})

roteador.get('/:idFornecedor', async (requisicao, resposta)=>{
   
    try{
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregarPorId()
        resposta.send(
            JSON.stringify(fornecedor)
        )
    } catch(erro){
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

roteador.put('/:idFornecedor', async (requisicao, resposta) => {
    try {
        const id = requisicao.params.idFornecedor;
        const dadosRecebidos = requisicao.body;
        const dados = Object.assign({}, dadosRecebidos, {id: id});
        const forncedor = new Fornecedor(dados);
        await forncedor.atualizar();
        resposta.end();
    } catch (erro){
        resposta.send(
            JSON.stringify({
                mensagem: erro
            })
        )
    }
})
module.exports = roteador;