import { registerAs } from "@nestjs/config";

interface AppConfig {
    node_env: string,
    port: number
}

export default registerAs('app', (): AppConfig => ({
    node_env: process.env.NODE_ENV || 'development',
    port: +process.env.PORT
}))