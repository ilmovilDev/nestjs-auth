import { Status } from "src/common/@enum/status.enum";
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('enum', { 
        enum: Status, 
        default: Status.ACTIVE 
    })
    status: Status;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

}