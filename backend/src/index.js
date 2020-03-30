const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
/*

GET: Buscar/listar informação no back-end
POST: Criar informação no back-end
PUT: Alterar informação no back-end
DELETE: Deletar informação no back-end

*/

/*
    Tipos de parametros

    Query Params:  Parâmetros enviados na rota após "?" (Filtros, paginação)
    Route Params:  Parâmetros utilizados para identificar recursos
    Request Body:  Corpo da requisição, utilizado para criar ou alterar recursos
*/

app.listen(3333);
