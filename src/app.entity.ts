import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Health {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: string;
}