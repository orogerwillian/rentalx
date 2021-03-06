import {container} from "tsyringe"

import {ICategoriesRepository} from "@modules/cars/repositories/ICategoriesRepository";
import {CategoriesRepository} from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import {ISpecificationsRepository} from "@modules/cars/repositories/ISpecificationsRepository";
import {SpecificationsRepository} from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import {IUserRepository} from "@modules/accounts/repositories/IUserRepository";
import {UsersRepository} from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import {ICarsRepository} from "@modules/cars/repositories/ICarsRepository";
import {CarsRepository} from "@modules/cars/infra/typeorm/repositories/CarsRepository";

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);

container.registerSingleton<IUserRepository>(
    "UsersRepository",
    UsersRepository
);

container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
);