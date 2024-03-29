import {ICreateCarDTO} from "@modules/cars/dtos/ICreateCarDTO";
import {Car} from "@modules/cars/infra/typeorm/entities/Car";

interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;

    findByLicencePlate(licencePlate: string): Promise<Car>;

    findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]>;

    findById(car_id: string): Promise<Car>;

    updateAvailable(id: string, available: boolean): Promise<void>;
}

export {ICarsRepository}