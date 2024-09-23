import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";
import { RoleEnum } from "src/common/@enum/role.enum";

@Entity('User')
export class User extends BaseEntity {

    @Column('text')
    username: string;

    @Column('text', { unique: true })
    email: string;

    @Column('text')
    password: string;

    @Column('boolean', { default: false })
    isEmailConfirmed: boolean;

    @Column({ type: 'varchar', nullable: true })
    emailVerificationCode: string | null;

    @Column({
        type: 'enum',
        enum: RoleEnum,
        default: RoleEnum.USER
    })
    roles: RoleEnum[];

}

/**
 * Inherited from BaseEntity:
 * @property {string} id - UUID primary key.
 * @property {Status} status - User status (ACTIVE/INACTIVE).
 * @property {Date} createdAt - Record creation timestamp.
 * @property {Date} updatedAt - Record last update timestamp.
 */