export interface AppConfig {
    app_port: number;
    node_env: string;
  
    // Database
    db_port: number;
    db_host: string;
    db_name: string;
    db_user: string;
    db_password: string;
  
    // Swagger
    doc_title: string;
    doc_description: string;
    doc_version: string;
  
    // Mailer
    mailer_app: string;
    mailer_from: string;
    mailer_host: string;
    mailer_port: number;
    mailer_user: string;
    mailer_password: string;
  
    // Bcrypt
    bcrypt_salt: number;
  
    // JSON Web Token
    jwt_secret: string;

}