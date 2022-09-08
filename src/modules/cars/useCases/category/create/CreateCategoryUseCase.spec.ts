import "reflect-metadata"

import {CreateCategoryUseCase} from "@modules/cars/useCases/category/create/CreateCategoryUseCase";
import {CategoriesRepositoryInMemory} from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import {AppError} from "@shared/errors/AppError";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    })

    it("should be able to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: "Category description Test"
        }

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");
    });

    it("should not be able to create a new category with name exists", async () => {
        await expect(async () => {
            const category = {
                name: "Category Test",
                description: "Category description Test"
            }

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });
        }).rejects.toBeInstanceOf(AppError);
    });
})