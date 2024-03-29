import {v4 as uuidV4} from "uuid";
import {Column, CreateDateColumn, Entity, PrimaryColumn} from "typeorm";

@Entity("categories")
class Category {

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;
}

export {Category};
