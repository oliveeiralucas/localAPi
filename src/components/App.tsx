import React, { FormEvent, useEffect, useState } from 'react'

import { Product } from '@/@types/Product'
import { useFetch } from '@/hooks/useFetch'

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]) // Agora é um array de Product
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<number>(0)

  const url = 'http://localhost:3000/products'

  const { data: responseData, httpConfig, loading, error } = useFetch(url)

  useEffect(() => {
    if (responseData) {
      setProducts(responseData) // Atualiza o estado com os produtos do response
    }
  }, [responseData])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const product: Product = {
      name,
      price
    }

    httpConfig(product, 'POST')
    setName('')
    setPrice(0)
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-400 text-center">
      <h1>Lista de Produtos</h1>
      <ul>
        {loading && <p>Carregando dados...</p>}
        {error && <p>{error.message}</p>}
        {products.map((product) => (
          <li key={product.id}>
            Código do produto: {product.id} | Produto: {product.name} | Preço:{' '}
            {product.price}
          </li>
        ))}
      </ul>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="mt-4 flex flex-col">
          <label className="my-4">
            Produto:
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border"
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              name="price"
              id="price"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              className="border"
            />
          </label>
          <input type="submit" value="Criar" />
        </div>
      </form>
    </div>
  )
}

export default App
