import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";

export class RentalsRepositoryInMemory implements IRentalsRepository {

  rentals: Rental[] = [];

  async findOpenedByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
  }

  async findOpenedByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
  }

  async create({ car_id, user_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {

    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date()
    });

    this.rentals.push(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.id == id);
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return this.rentals.filter(rental => rental.user_id == user_id);
  }

}