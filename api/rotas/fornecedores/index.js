const roteador = require('express').Router();
const tabelaFornecedor = require('./tabelaFornecedor')
const Fornecedor = require('./Fornecedor');
const SerealizadorFornecedor = require('../../Serializador').SerealizadorFornecedor;

roteador.get('/', async(requisicao, resposta) => {
    const resultados = await tabelaFornecedor.listar();
    resposta.status(200)
    const serializador = new SerealizadorFornecedor(
        resposta.getHeader('Content-Type')
    )
    resposta.send(
        serializador.serealizar(resultados)
    )
});

roteador.post('/', async(requisicao, resposta, proximo) => {
    try {
        const dadosRecebidos = requisicao.body
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar()
        resposta.status(201)
        const serializador = new SerealizadorFornecedor(
            resposta.getHeader('Content-Type')
        )
        resposta.send(
            serializador.serealizar(fornecedor)
        )
    } catch (error) {
        proximo(error)
    }

})

roteador.get('/:idFornecedor', async(requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregarPorId()
        resposta.status(200)
        const serializador = new SerealizadorFornecedor(
            resposta.getHeader('Content-Type')
        )
        resposta.send(
            serializador.serealizar(fornecedor)
        )
    } catch (error) {
        proximo(error)
    }
})

roteador.put('/:idFornecedor', async(requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idFornecedor;
        const dadosRecebidos = requisicao.body;
        const dados = Object.assign({}, dadosRecebidos, { id: id });
        const forncedor = new Fornecedor(dados);
        await forncedor.atualizar();
        resposta.status(204)
        resposta.end();
    } catch (erro) {
        proximo(erro)
    }
})

roteador.delete('/:idFornecedor', async(requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idFornecedor
        const forncedor = new Fornecedor({ id: id })
        await forncedor.remover()
        resposta.status(204)
        resposta.end()
    } catch (error) {
        proximo(error)
    }
})

module.exports = roteador;