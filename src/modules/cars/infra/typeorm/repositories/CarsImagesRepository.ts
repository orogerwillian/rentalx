import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { getRepository, Repository } from "typeorm";

import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";

export class CarsImagesRepository implements ICarsImagesRepository {

  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {

    const carImage = this.repository.create({
      car_id,
      image_name
    });

    return await this.repository.save(carImage);
  }

}