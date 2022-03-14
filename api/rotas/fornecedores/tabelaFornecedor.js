const Modelo = require('./ModeloTabelaFornecedor')

module.exports = {
    listar () {
        return Modelo.findAll()
    },
    inserir(fornecedor){
        try
        {
            return Modelo.create(fornecedor)
        } catch (e){
            return e;
        }
       
    },
    async pegarPorId(id){
            const encontrado = Modelo.findOne({
                where: {
                    id: id
                }
            })
            if(!encontrado){
                throw new Error('Fornecedor não encontrado')
            }
            return encontrado;
       
    },
    atualizar(id,dadosParaAtualizar){
    return Modelo.update(
        dadosParaAtualizar,
        {
            where: {id: id}
        }
        )
    }
    
}