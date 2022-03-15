class NaoEncontrado extends Error {
    constructor() {
        super('Fornecedor Não Encontrado')
        this.name = 'NaoEncontrado'
        this.idErro = 0
    }
}
module.exports = NaoEncontrado