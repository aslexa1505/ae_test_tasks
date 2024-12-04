import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres', // replace with your actual username
  password: 'root', // replace with your actual password
  database: 'postgres', // replace with your actual database name
  entities: [User],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false,
  logging: false,
});
