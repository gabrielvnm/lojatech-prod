import { z } from 'zod';
export declare const criarProdutoDto: z.ZodObject<{
    name: z.ZodString;
    price: z.ZodNumber;
    desc: z.ZodString;
}, z.core.$strip>;
export declare const atualizarProdutoDto: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    desc: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const substituirProdutoDto: z.ZodObject<{
    name: z.ZodString;
    price: z.ZodNumber;
    desc: z.ZodString;
}, z.core.$strip>;
export type CriarProdutoDto = z.infer<typeof criarProdutoDto>;
export type AtualizarProdutoDto = z.infer<typeof atualizarProdutoDto>;
export type SubstituirProdutoDto = z.infer<typeof substituirProdutoDto>;
//# sourceMappingURL=produto.dto.d.ts.map