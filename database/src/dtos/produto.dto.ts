import { z } from 'zod'

// Schema do Zod
export const criarProdutoDto = z.object({
    
    name: z.string({
        error: issue =>
            issue.input === undefined
            ? 'O campo nome é obrigatório.'
            : 'O nome deve ser um texto.',
    }).min(2, 'O nome deve ter ao menos 2 caracteres.'),

    price: z.number({
        error: issue =>
            issue.input === undefined
                ? 'O campo preço é obrigatório.'
                : 'O preço deve ser um número.',
    }).positive('O preço deve ser maior que zero.'),

    desc: z.string({
        error: issue =>
            issue.input === undefined
            ? 'O campo descrição é obrigatório'
            : 'A descrição deve ser um texto',
    }).min(5, 'A descrição deve ter ao menos 5 caracteres.'),

})

export const atualizarProdutoDto = criarProdutoDto.partial()

export const substituirProdutoDto = criarProdutoDto

export type CriarProdutoDto = z.infer<typeof criarProdutoDto>
export type AtualizarProdutoDto = z.infer<typeof atualizarProdutoDto>
export type SubstituirProdutoDto = z.infer<typeof substituirProdutoDto>