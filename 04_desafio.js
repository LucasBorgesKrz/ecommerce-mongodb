// Parte 3 - Desafio
db = db.getSiblingDB("ecommerce_db");

// $elemMatch: UM MESMO elemento de "variacoes" precisa ter tamanho M E cor Azul
print("--- $elemMatch: tamanho M e cor Azul na mesma variacao ---");
printjson(
  db.produtos
    .find(
      { variacoes: { $elemMatch: { tamanho: "M", cor: "Azul" } } },
      { titulo: 1, variacoes: 1, _id: 0 }
    )
    .toArray()
);

// Comparacao: SEM $elemMatch, as condicoes podem ser satisfeitas por elementos diferentes
// (a Jaqueta aparece por engano: tem M Preto e G Azul)
print("--- Sem $elemMatch (resultado enganoso) ---");
printjson(
  db.produtos
    .find(
      { "variacoes.tamanho": "M", "variacoes.cor": "Azul" },
      { titulo: 1, _id: 0 }
    )
    .toArray()
);

// Bonus: explain mostrando que o indice de preco foi usado
print("--- explain: preco > 500 (com indice) ---");
const exp = db.produtos.find({ preco: { $gt: 500 } }).explain("executionStats");
print("nReturned: " + exp.executionStats.nReturned);
print("totalKeysExamined: " + exp.executionStats.totalKeysExamined);
print("totalDocsExamined: " + exp.executionStats.totalDocsExamined);
printjson(exp.queryPlanner.winningPlan);

// Comparacao: forcando varredura da colecao inteira (sem indice)
print("--- explain: mesma consulta SEM indice (COLLSCAN) ---");
const semIdx = db.produtos
  .find({ preco: { $gt: 500 } })
  .hint({ $natural: 1 })
  .explain("executionStats");
print("totalKeysExamined: " + semIdx.executionStats.totalKeysExamined);
print("totalDocsExamined: " + semIdx.executionStats.totalDocsExamined);
