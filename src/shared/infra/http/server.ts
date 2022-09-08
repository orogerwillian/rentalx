import "reflect-metadata";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import express, {NextFunction, Request, Response} from "express";
import {router} from "@shared/infra/http/routes";

import swaggerDocument from "../../../swagger.json";
import {AppError} from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";
import "@shared/container";

createConnection()
    .then(() => console.log("Database connected!"))
    .catch(err => console.error(err.message));

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    });
});

app.listen(3333, () => console.log("Server is running"));
