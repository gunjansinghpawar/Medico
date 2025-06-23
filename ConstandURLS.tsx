export const DATABSE_URL = process.env.NEXT_MONGODB_URL || "mongodb+srv://admin:admin@cluster0.csfpec6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const JWT_SECRET = process.env.NEXT_JWT_SECRET || 'medico_secret_key';

export const REFRESH_SECRET = process.env.NEXT_REFERSH_SECRET || 'medico_refresh_secret_key';