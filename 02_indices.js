// Parte 2 - Indices
db = db.getSiblingDB("ecommerce_db");

// Indice simples: preco e um campo muito usado em filtros e ordenacao
db.produtos.createIndex({ preco: 1 });

// Indice de texto: so pode existir UM por colecao, por isso juntamos titulo e descricao
db.produtos.createIndex({ titulo: "text", descricao: "text" });

printjson(db.produtos.getIndexes());
