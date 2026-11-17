// Parte 2 - Consultas
db = db.getSiblingDB("ecommerce_db");

// 1. Operadores de comparacao: produtos entre R$ 50 e R$ 300
print("--- 1. Preco entre 50 e 300 ---");
printjson(
  db.produtos
    .find({ preco: { $gt: 50, $lt: 300 } }, { titulo: 1, preco: 1, _id: 0 })
    .toArray()
);

// 2. Valor dentro de um array: produtos com a tag "promoção"
print("--- 2. Tag promocao ---");
printjson(
  db.produtos
    .find({ tags: "promoção" }, { titulo: 1, tags: 1, _id: 0 })
    .toArray()
);

// 3. Busca textual (usa o indice de texto), ordenada por relevancia
print("--- 3. Busca textual: treino ---");
printjson(
  db.produtos
    .find(
      { $text: { $search: "treino" } },
      { titulo: 1, score: { $meta: "textScore" }, _id: 0 }
    )
    .sort({ score: { $meta: "textScore" } })
    .toArray()
);

// Extra: busca parcial sem diferenciar maiusculas, com $regex (nao usa o indice de texto)
print("--- Extra. Regex: titulos com 'tênis' ---");
printjson(
  db.produtos
    .find({ titulo: { $regex: "tênis", $options: "i" } }, { titulo: 1, _id: 0 })
    .toArray()
);
