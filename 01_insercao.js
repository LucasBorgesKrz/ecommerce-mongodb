// Parte 1 - Insercao de dados
// Em arquivo .js o comando "use" nao funciona, por isso usamos getSiblingDB
db = db.getSiblingDB("ecommerce_db");

// Limpa a colecao para o script poder ser executado varias vezes
db.produtos.drop();

db.produtos.insertMany([
  {
    titulo: "Camiseta Dry Fit",
    descricao: "Camiseta leve para treino, secagem rápida",
    preco: 89.9,
    tags: ["esporte", "promoção"],
    fabricante: { nome: "Nike", pais: "EUA" },
    variacoes: [
      { tamanho: "M", cor: "Azul", estoque: 10 },
      { tamanho: "G", cor: "Preto", estoque: 4 }
    ]
  },
  {
    titulo: "Tênis de Corrida Pro",
    descricao: "Tênis leve com amortecimento para corrida e treino",
    preco: 599.9,
    tags: ["esporte", "calçado", "lançamento"],
    fabricante: { nome: "Asics", pais: "Japão" },
    variacoes: [
      { tamanho: "40", cor: "Azul", estoque: 6 },
      { tamanho: "42", cor: "Preto", estoque: 8 }
    ]
  },
  {
    titulo: "Meia Esportiva Cano Alto",
    descricao: "Par de meias respirável para esporte e academia",
    preco: 29.9,
    tags: ["esporte", "acessório", "promoção"],
    fabricante: { nome: "Puma", pais: "Alemanha" },
    variacoes: [
      { tamanho: "M", cor: "Branco", estoque: 30 },
      { tamanho: "G", cor: "Branco", estoque: 25 }
    ]
  },
  {
    titulo: "Notebook Gamer 15",
    descricao: "Notebook com placa de vídeo dedicada para jogos e edição",
    preco: 4899.0,
    tags: ["eletrônicos", "gamer"],
    fabricante: { nome: "Acer", pais: "Taiwan" },
    variacoes: [
      { tamanho: "15.6 pol", cor: "Preto", estoque: 3 }
    ]
  },
  {
    titulo: "Jaqueta Corta-Vento",
    descricao: "Jaqueta leve e impermeável para corrida ao ar livre",
    preco: 249.9,
    tags: ["vestuário", "esporte", "promoção"],
    fabricante: { nome: "Adidas", pais: "Alemanha" },
    variacoes: [
      { tamanho: "M", cor: "Preto", estoque: 5 },
      { tamanho: "G", cor: "Azul", estoque: 3 }
    ]
  },
  {
    titulo: "Mochila Impermeável para Treino",
    descricao: "Mochila resistente com compartimento para tênis e treino diário",
    preco: 159.9,
    tags: ["acessório", "esporte"],
    fabricante: { nome: "Oakley", pais: "EUA" },
    variacoes: [
      { tamanho: "M", cor: "Azul", estoque: 7 },
      { tamanho: "M", cor: "Verde", estoque: 2 }
    ]
  }
]);

print("Total inserido: " + db.produtos.countDocuments());