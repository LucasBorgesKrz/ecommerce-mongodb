db = db.getSiblingDB("ecommerce_db");
db.produtos.drop();

db.produtos.insertMany([
  // seus produtos aqui
]);

print("Total inserido: " + db.produtos.countDocuments());