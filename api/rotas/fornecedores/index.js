const roteador = require('express').Router();
const tabelaFornecedor = require('./tabelaFornecedor')

roteador.use('/', async (requisicao, resposta) => {
    const resultados = await tabelaFornecedor.listar();
    resposta.send(
        JSON.stringify(resultados)
    )
});

module.exports = roteador;