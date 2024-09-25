import { registerAs } from "@nestjs/config";

interface BcryptConfig {
    salt: number
}

export default registerAs('bcrypt', (): BcryptConfig => ({
    salt: +process.env.BCRYPT_SALT_ROUNDS
}))