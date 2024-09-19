import { registerAs } from "@nestjs/config";

interface JwtConfig {
    jwt_secret: string
}

export default registerAs('jwt', (): JwtConfig => ({
    jwt_secret: process.env.JWT_SECRET
}))