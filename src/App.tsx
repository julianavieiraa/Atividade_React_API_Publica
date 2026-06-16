import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get<{ products: Product[] }>("https://dummyjson.com/products");
        setProducts(response.data.products);
      } catch (error) {
        console.log("Erro ao buscar produtos:", error);
      }
    }

    fetchProducts();
  }, []);

  const produtosFiltrados = products.filter((produto) =>
    produto.title.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Lista de Produtos</h1>

      <input className="pesquisa" type="text" placeholder="Pesquisar produto..." value={pesquisa} onChange={(e) => setPesquisa(e.target.value)} />
      <p className="total"> Total de produtos: {products.length}</p>
      <div className="cards">
        {produtosFiltrados.map((produto) => (
          <div key={produto.id} className="card">
            <img src={produto.thumbnail} alt={produto.title} className="imagem" />

            <h3>{produto.title}</h3>

            <p className="preco">R$ {produto.price}</p>

            <p className="categoria">
              {produto.category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;