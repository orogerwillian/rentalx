import "reflect-metadata";

import {CreateUserUseCase} from "@modules/accounts/useCases/user/create/CreateUserUseCase";
import {AuthenticateUserUseCase} from "@modules/accounts/useCases/user/authenticate/AuthenticateUserUseCase";
import {UsersRepositoryInMemory} from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import {ICreateUserDTO} from "@modules/accounts/dtos/ICreateUserDTO";
import {AppError} from "@shared/errors/AppError";

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to authenticate a user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000124",
            email: "user@teste.com",
            password: "1234",
            name: "User Test"
        };
        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate a non existent user", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "1234"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to autentichate with incorret password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "9999",
                email: "user@user.com",
                password: "1234",
                name: "User Test Error"
            };
            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "incorretPassword"
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});