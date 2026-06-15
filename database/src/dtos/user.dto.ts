import { z } from 'zod'

// validação de usuarios com zod
export const registerUserDto = z.object({
    name: z.string({
        error: issue =>
            issue.input === undefined
                ? 'O campo nome é obrigatório.'
                : 'O nome deve ser um texto.',
    }).min(3, 'O nome deve ter ao menos 3 caracteres.'),

    email: z.string({
        error: issue =>
            issue.input === undefined
                ? 'O campo email é obrigatório.'
                : 'O email deve ser um texto.',
    }).email('Email inválido.'),

    password: z.string({
        error: issue =>
            issue.input === undefined
                ? 'O campo senha é obrigatório.'
                : 'A senha deve ser um texto.',
    }).min(6, 'A senha deve ter ao menos 6 caracteres.'),
})

// validação de login
export const loginUserDto = z.object({
    email: z.string({
        error: issue =>
            issue.input === undefined
                ? 'O campo email é obrigatório.'
                : 'O email deve ser um texto.',
    }).email('Email inválido.'),

    password: z.string({
        error: issue =>
            issue.input === undefined
                ? 'O campo senha é obrigatório.'
                : 'A senha deve ser um texto.',
    }).min(1, 'A senha é obrigatória.'),
})

export type RegisterUserDto = z.infer<typeof registerUserDto>
export type LoginUserDto = z.infer<typeof loginUserDto>

export interface AuthResponseDTO {
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
        created_at: string;
        updated_at: string;
    };
    token: string;
}