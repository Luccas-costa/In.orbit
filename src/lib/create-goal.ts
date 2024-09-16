'use server'

import { sql } from '@vercel/postgres'

export async function ClienteInsertBD({
  nome_estabelecimento,
  receita_total,
  numero_pedidos,
  numero_cancelamentos,
  id,
}: {
  nome_estabelecimento: string
  receita_total: string
  numero_pedidos: string
  numero_cancelamentos: string
  id: number
}) {
  try {
    console.log('Enviando dados para o banco de dados...')
    await sql`INSERT INTO pizza_shop_cliente (nome_estabelecimento, receita_total, numero_pedidos, numero_cancelamentos, id) VALUES (${nome_estabelecimento}, ${receita_total}, ${numero_pedidos}, ${numero_cancelamentos}, ${id})`
    console.log('Enviado com sucesso!')
  } catch (error) {
    console.log(error)
  }
}
