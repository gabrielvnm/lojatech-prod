import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { eq } from 'drizzle-orm'
import { db } from '../db/client.js'
import { users } from '../db/schema.js'
import { registerUserDto, loginUserDto } from '../dtos/user.dto.js'

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key-change-this'
const JWT_EXPIRES_IN = '7d'

// POST /auth/register
export async function register(req: Request, res: Response) {
  const validationResult = registerUserDto.safeParse(req.body)
  
  if (!validationResult.success) {
    res.status(400).json({ erros: validationResult.error.flatten().fieldErrors })
    return
  }

  const { name, email, password } = validationResult.data

  const existingUser = db.select().from(users).where(eq(users.email, email)).get()
  
  if (existingUser) {
    res.status(409).json({ erro: 'Usuário com este email já existe' })
    return
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10)

  const newUser = db
    .insert(users)
    .values({
      name,
      email,
      password_hash: passwordHash
    })
    .returning()
    .get()

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )

  res.status(201).json({
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      created_at: newUser.created_at,
      updated_at: newUser.updated_at
    },
    token
  })
}

// POST /auth/login
export async function login(req: Request, res: Response) {
  const validationResult = loginUserDto.safeParse(req.body)
  
  if (!validationResult.success) {
    res.status(400).json({ erros: validationResult.error.flatten().fieldErrors })
    return
  }

  const { email, password } = validationResult.data

  // Find user by email
  const user = db.select().from(users).where(eq(users.email, email)).get()
  
  if (!user) {
    res.status(401).json({ erro: 'Email ou senha inválidos' })
    return
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password_hash)
  
  if (!isValidPassword) {
    res.status(401).json({ erro: 'Email ou senha inválidos' })
    return
  }

  // Generate token
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  )

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at
    },
    token
  })
}