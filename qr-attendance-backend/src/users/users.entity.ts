// Entity = table in database

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {

  // Primary key (auto increment)
  @PrimaryGeneratedColumn()
  id: number;

  // Column for name
  @Column()
  name: string;

  // Unique email (no duplicates allowed)
  @Column({ unique: true })
  email: string;

  // Password (will be hashed later)
  @Column()
  password: string;

  // Role (admin or user)
  @Column({ default: 'user' })
  role: string;
}