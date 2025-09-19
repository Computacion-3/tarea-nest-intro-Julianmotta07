import { Role } from '../../roles/entities/role.entity';
import { Game } from '../../games/entities/game.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string;

    @Column({ nullable: true })
    bio: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Role, (role) => role.users, { eager: true })
    @JoinColumn({ name: 'role_id' })
    role: Role;

    @OneToMany(() => Game, (game) => game.createdBy)
    games: Game[];
}