// import { Router } from 'express'
// import {
//   listarProdutos,
//   buscarProduto,
//   criarProduto,
//   substituirProduto,
//   atualizarProduto,
//   removerProduto,
// } from '../controllers/produtos.controller.js'
// const router = Router()
// router.get('/', listarProdutos)
// router.get('/:id', buscarProduto)
// router.post('/', criarProduto)
// router.put('/:id', substituirProduto)
// router.patch('/:id', atualizarProduto)
// router.delete('/:id', removerProduto)
// export default router
import { Router } from 'express';
import { listarProdutos, buscarProduto, criarProduto, substituirProduto, atualizarProduto, removerProduto } from '../controllers/produtos.controller.js';
const router = Router();
router.get('/', listarProdutos);
router.get('/:id', buscarProduto);
router.post('/', criarProduto);
router.put('/:id', substituirProduto);
router.patch('/:id', atualizarProduto);
router.delete('/:id', removerProduto);
export default router;
//# sourceMappingURL=produtos.routes.js.map