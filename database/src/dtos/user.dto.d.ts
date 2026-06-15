import { z } from 'zod';
export declare const registerUserDto: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const loginUserDto: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type RegisterUserDto = z.infer<typeof registerUserDto>;
export type LoginUserDto = z.infer<typeof loginUserDto>;
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
//# sourceMappingURL=user.dto.d.ts.map