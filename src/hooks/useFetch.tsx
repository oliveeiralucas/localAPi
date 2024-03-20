import { useEffect, useState } from 'react'

import { Product } from '@/@types/Product'

interface ConfigProps {
  method: string
  headers: {
    [key: string]: string
  }
  body: string
}

export const useFetch = (url: string) => {
  // hook fetch
  const [data, setData] = useState<Product[]>([])
  // hook post
  const [config, setConfig] = useState<ConfigProps>()
  const [method, setMethod] = useState<string>()
  const [callFetch, setCallFetch] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error>()

  // hook fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const req = await fetch(url)

        if (!req.ok) {
          throw new Error('Falha ao carregar dados')
        }

        const res = await req.json()

        setData(res)
        setMethod(undefined)
        setError(undefined)
      } catch (error) {
        console.error('Erro ao carregar dados', error)
        setError(new Error('Houve um erro ao carregar os dados!')) // Transformado em um objeto Error
      }
      setLoading(false)
    }
    fetchData()
  }, [url, callFetch])

  // config request
  const httpConfig = (data: Product, method: string) => {
    if (method === 'POST') {
      setConfig({
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      setMethod('POST')
    }
  }

  // hook post
  useEffect(() => {
    if (method === 'POST') {
      const httpRequest = async () => {
        setLoading(true)
        if (config) {
          const req = await fetch(url, config)
          const res = await req.json()
          setCallFetch(res)
        }
      }
      httpRequest()
    }
  }, [config, method, url])

  // retorno da função
  return { data, httpConfig, loading, error }
}
