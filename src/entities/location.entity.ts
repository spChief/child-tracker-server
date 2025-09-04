import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  deviceId: string;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitude: number;

  @Column({ type: 'float' })
  accuracy: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  altitude: number | null;

  @Column({ type: 'float', nullable: true })
  speed: number | null;

  @Column({ type: 'float', nullable: true })
  bearing: number | null;

  @Column({ type: 'bigint' })
  timestamp: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  provider: string | null;

  @CreateDateColumn()
  createdAt: Date;
}
