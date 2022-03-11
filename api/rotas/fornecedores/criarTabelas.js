const modeloTabelas = require('../rotas/fornecedores/modeloTabelaFornecedor')

modeloTabelas.sync().then(()=> console.log('Tabela criada com sucesso')).catch(console.log)