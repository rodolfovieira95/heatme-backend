import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('chat_messages')
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { eager: true })
  fromUser: User;

  @ManyToOne(() => User, { eager: true })
  toUser: User;

  @Column()
  content: string;

  @CreateDateColumn()
  timestamp: Date;
}
