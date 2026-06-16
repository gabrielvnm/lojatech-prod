import type { Request, Response } from 'express'
import { eq } from 'drizzle-orm'
import { db } from '../db/client.js'
import { produtos } from '../db/schema.js'
import {
  criarProdutoDto,
  atualizarProdutoDto,
  substituirProdutoDto,
} from '../dtos/produto.dto.js'

// GET /produtos
export function listarProdutos(req: Request, res: Response) {
  const lista = db.select().from(produtos).all()
  res.json(lista)
}

// GET /produtos/:id
export function buscarProduto(req: Request, res: Response) {
  const id = Number(req.params.id)
  const produto = db
    .select()
    .from(produtos)
    .where(eq(produtos.id, id))
    .get()

  if (!produto) {
    res.status(404).json({ erro: 'Produto não encontrado.' })
    return
  }

  res.json(produto)
}

// POST /produtos
export function criarProduto(req: Request, res: Response) {
  const resultado = criarProdutoDto.safeParse(req.body)
  if (!resultado.success) {
    res.status(400).json({ erros: resultado.error.flatten().fieldErrors })
    return
  }

  const novo = db
    .insert(produtos)
    .values(resultado.data)
    .returning()
    .get()

  res.status(201).json(novo)
}

// PUT /produtos/:id
export function substituirProduto(req: Request, res: Response) {
  const id = Number(req.params.id)
  const resultado = substituirProdutoDto.safeParse(req.body)
  if (!resultado.success) {
    res.status(400).json({ erros: resultado.error.flatten().fieldErrors })
    return
  }

  const atualizado = db
    .update(produtos)
    .set(resultado.data)
    .where(eq(produtos.id, id))
    .returning()
    .get()

  if (!atualizado) {
    res.status(404).json({ erro: 'Produto não encontrado.' })
    return
  }

  res.json(atualizado)
}

// PATCH /produtos/:id
export function atualizarProduto(req: Request, res: Response) {
  const id = Number(req.params.id)
  const resultado = atualizarProdutoDto.safeParse(req.body)
  if (!resultado.success) {
    res.status(400).json({ erros: resultado.error.flatten().fieldErrors })
    return
  }

  // PATCH sem nenhum campo: nada a atualizar
  if (Object.keys(resultado.data).length === 0) {
    res.status(400).json({ erro: 'Envie ao menos um campo para atualizar.' })
    return
  }

  const atualizado = db
    .update(produtos)
    .set(resultado.data)
    .where(eq(produtos.id, id))
    .returning()
    .get()

  if (!atualizado) {
    res.status(404).json({ erro: 'Produto não encontrado.' })
    return
  }

  res.json(atualizado)
}

// DELETE /produtos/:id
export function removerProduto(req: Request, res: Response) {
  const id = Number(req.params.id)

  const removido = db
    .delete(produtos)
    .where(eq(produtos.id, id))
    .returning()
    .get()

  if (!removido) {
    res.status(404).json({ erro: 'Produto não encontrado.' })
    return
  }

  res.status(204).send()
}

