import express, { Request, Response } from "express";
import salesRouter from "./sales_routes";

const router = express.Router();

//Landpage
router.get('/', (request: Request, response: Response) => {
    response.json({
        status: 'success',
        content: 'Poin Of Sale',
    });
});

router.use('/sales', salesRouter)

export default router;
