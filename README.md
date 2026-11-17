# Catálogo de E-commerce com MongoDB

Projeto de modelagem NoSQL orientado a documentos, aplicando inserção, índices,
consultas e `$elemMatch` em um catálogo de produtos.

## Modelagem

Banco: `ecommerce_db` | Coleção: `produtos`

```js
{
  titulo: "Camiseta Dry Fit",
  descricao: "Camiseta leve para treino, secagem rápida",
  preco: 89.9,
  tags: ["esporte", "promoção"],                       // array
  fabricante: { nome: "Nike", pais: "EUA" },           // subdocumento
  variacoes: [                                         // array de subdocumentos
    { tamanho: "M", cor: "Azul", estoque: 10 },
    { tamanho: "G", cor: "Preto", estoque: 4 }
  ]
}
```

## Arquivos

| Arquivo | Conteúdo |
|---|---|
| `01_insercao.js` | Parte 1: criação da coleção e `insertMany` com 6 produtos |
| `02_indices.js` | Parte 2: índice simples (`preco`) e índice de texto (`titulo` + `descricao`) |
| `03_consultas.js` | Parte 2: consultas com `$gt/$lt`, busca em array e `$text` |
| `04_desafio.js` | Parte 3: `$elemMatch` e `explain("executionStats")` |

## Como executar

Pré-requisito: `mongosh` instalado e acesso a um MongoDB (local ou Atlas).
Execute na ordem, na pasta do projeto:

```bash
mongosh "SUA_CONNECTION_STRING" 01_insercao.js
mongosh "SUA_CONNECTION_STRING" 02_indices.js
mongosh "SUA_CONNECTION_STRING" 03_consultas.js
mongosh "SUA_CONNECTION_STRING" 04_desafio.js
```

Para MongoDB local, a string é `mongodb://localhost:27017`.
O script `01_insercao.js` apaga e recria a coleção `produtos`, então pode ser executado várias vezes.

## Resultados do desafio

- `$elemMatch` com `{ tamanho: "M", cor: "Azul" }` retorna apenas produtos em que
  **a mesma variação** tem as duas características (Camiseta e Mochila).
- Sem `$elemMatch`, a Jaqueta também aparece por engano, pois tem uma variação `M`
  (Preto) e outra `Azul` (G), em elementos diferentes do array.
- No `explain("executionStats")` da consulta `preco > 500`, o plano usa `IXSCAN`
  no índice `preco_1` e `totalKeysExamined` é 2. Sem o índice (`COLLSCAN`),
  são lidos os 6 documentos.

## Parte 4: Reflexão

**No MongoDB, qual é a principal diferença de arquitetura entre "Embedding" e "Referencing"? Em que cenário de um e-commerce cada um deve ser usado?**

A principal diferença está em **onde os dados relacionados ficam guardados**.

No **Embedding** (incorporar), o dado relacionado fica **dentro do próprio documento**, como um subdocumento ou um array. No meu projeto, o `fabricante` e as `variacoes` (tamanho, cor e estoque) ficam dentro do documento do produto. Com isso, uma única consulta já traz tudo, sem precisar de JOIN, o que deixa a leitura mais rápida e simples. Por isso, o embedding é ideal para dados que **são lidos juntos e mudam pouco**: toda vez que a página de um produto é exibida, o fabricante e as variações aparecem junto.

No **Referencing** (referenciar), o documento guarda apenas o **`_id` de um documento de outra coleção**, e o dado completo é buscado depois (com uma segunda consulta ou com `$lookup`). Isso lembra a ideia de chave estrangeira do modelo relacional, mas sem a garantia de integridade que o banco relacional oferece. Ele é a melhor escolha quando o dado **muda com frequência**, quando ele é **repetido em muitos documentos** ou em relacionamentos **muitos-para-muitos**, porque evita duplicação: se o dado muda, basta atualizar em um único lugar.

**Quando usar cada um em um e-commerce:**

- **Embedding:** `fabricante`, `variacoes` e `tags` dentro do produto, pois são dados descritivos que sempre acompanham o produto e raramente mudam.
- **Referencing:** os **pedidos**. Um pedido deve guardar o `cliente_id` e os `produto_id`, em vez de copiar todos os dados do cliente e do produto. Assim, se o cliente mudar de endereço ou o produto mudar de preço, a informação não fica desatualizada ou duplicada. O mesmo vale para as **avaliações** de um produto: elas ficam em outra coleção, porque podem crescer sem limite.

**Cuidado com o limite de tamanho:** cada documento do MongoDB pode ter no máximo **16 MB**. Por isso, arrays que crescem indefinidamente (como milhares de avaliações dentro de um único produto) não devem ser incorporados. Nesse caso, referenciar é o caminho mais seguro.

**Resumo:** o embedding prioriza a **velocidade de leitura** de dados que andam juntos e são estáveis. O referencing prioriza a **consistência** e o **crescimento** de dados que mudam, se repetem ou podem crescer muito. Na prática, o melhor modelo costuma misturar os dois, de acordo com a forma como a aplicação lê e atualiza os dados.
