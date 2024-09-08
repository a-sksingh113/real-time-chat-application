import express from 'express';
import {sendMessage,getMessage}  from '../controllers/messageController.js';
import isAuthenticated from '../middleware/isAuthenticated.js';
const router = express.Router();

router.post('/send/:id',isAuthenticated,sendMessage);
router.get('/:id',isAuthenticated,getMessage);
export default router;