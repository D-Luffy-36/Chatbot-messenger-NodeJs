import express from 'express';
import {
    getHomePage, getABC, getWebhook,
    postWebhook
} from '../controllers/chatBotController.js'

const router = express.Router();



router.get('/', getHomePage);
router.get('/abc', getABC);

router.get('/messaging-webhook', getWebhook);
router.post('/webhook', postWebhook);

// console.log(router);

export default router;
