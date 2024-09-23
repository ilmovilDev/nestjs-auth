import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

enum Status {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

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