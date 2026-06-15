import { z } from 'zod';
export const registerUserDto = z.object({
    name: z.string().min(3, 'O nome deve ter ao menos 3 caracteres.'),
    email: z.string().email('Email inválido.'),
    password: z.string().min(6, 'A senha deve ter ao menos 6 caracteres.'),
});
export const loginUserDto = z.object({
    email: z.string().email('Email inválido.'),
    password: z.string().min(1, 'A senha é obrigatória.'),
});
//# sourceMappingURL=user.dto.js.map