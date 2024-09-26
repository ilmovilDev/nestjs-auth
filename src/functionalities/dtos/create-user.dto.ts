import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEmail, IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { RoleEnum } from "src/common/enum/role.enum";
import { Status } from "src/common/enum/status.enum";

export class CreateUserDto {

    @ApiProperty({})
    @IsString()
    @MaxLength(55)
    username: string;

    @ApiProperty({})
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Password of the user, must be 8-14 characters long and include uppercase, lowercase letters, and a number.',
        example: 'Password123',
    })
    @IsString()
    @MinLength(8)
    @MaxLength(14)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have an uppercase, lowercase letter, and a number'
    })
    password: string;

    @ApiProperty({
        description: 'Status of the user account, default is ACTIVE.',
        example: 'ACTIVE',
        required: false,
    })
    @IsOptional()
    @IsEnum(Status)
    status?: Status

    @ApiProperty({
        description: 'Array of roles assigned to the user. Defaults to USER role.',
        example: ['USER', 'ADMIN'],
        required: false,
    })
    @IsOptional()
    @IsArray()
    @IsEnum(RoleEnum, { each: true })
    roles?: RoleEnum[];
    
    @ApiProperty({
        description: 'Flag indicating whether the email has been confirmed. Defaults to false.',
        example: false,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    isEmailConfirmed?: boolean;

    @ApiProperty({
        description: 'Code for verifying the user\'s email.',
        example: 'b9b5a4f0-8c4d-49c9-ae7d-5679ecfa7297',
        nullable: true,
        required: false
    })
    @IsOptional()
    @IsString()
    emailVerificationCode?: string | null;
}