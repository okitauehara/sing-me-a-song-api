import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).send({
    message: 'Test: Welcome to Sing Me A Song API!',
  });
});

export default router;
