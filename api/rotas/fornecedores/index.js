const roteador = require('express').Router();
const tabelaFornecedor = require('./tabelaFornecedor')
const Fornecedor = require('./Fornecedor');
const req = require('express/lib/request');

roteador.get('/', async(requisicao, resposta) => {
    const resultados = await tabelaFornecedor.listar();
    resposta.status(200)
    resposta.send(
        JSON.stringify(resultados)
    )
});

roteador.post('/', async(requisicao, resposta) => {
    try {
        const dadosRecebidos = requisicao.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        resposta.status(201)
        resposta.send(
            JSON.stringify(fornecedor)
        )
    } catch (error) {
        resposta.status(400)
        resposta.send(
            JSON.stringify({
                mensagem: error.mensagem
            })
        )
    }

})

roteador.get('/:idFornecedor', async(requisicao, resposta) => {
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregarPorId()
        resposta.status(200)
        resposta.send(
            JSON.stringify(fornecedor)
        )
    } catch (erro) {
        resposta.status(401)
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

roteador.put('/:idFornecedor', async(requisicao, resposta) => {
    try {
        const id = requisicao.params.idFornecedor;
        const dadosRecebidos = requisicao.body;
        const dados = Object.assign({}, dadosRecebidos, { id: id });
        const forncedor = new Fornecedor(dados);
        await forncedor.atualizar();
        resposta.status(204)
        resposta.end();
    } catch (erro) {
        resposta.status(400)
        resposta.send(
            JSON.stringify({
                mensagem: erro
            })
        )
    }
})

roteador.delete('/:idFornecedor', async(requisicao, resposta) => {
    try {
        const id = requisicao.params.idFornecedor
        const forncedor = new Fornecedor({ id: id })
        await forncedor.remover()
        resposta.status(204)
        resposta.end()
    } catch (erro) {
        resposta.status(404)
        resposta.send(
            JSON.stringify({
                mensagem: erro
            })
        )
    }
})

module.exports = roteador;