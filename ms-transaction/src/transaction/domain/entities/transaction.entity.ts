import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { TransactionTypeEntity } from './transaction-type.entity';

@Entity('transaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 255,
    nullable: true,
    name: 'account_external_id_debit',
  })
  accountExternalIdDebit: string;

  @Column('varchar', {
    length: 255,
    nullable: true,
    name: 'account_external_id_credit',
  })
  accountExternalIdCredit: string;

  @Column({
    name: 'tranfer_value',
  })
  value: number;

  @Column('varchar', {
    length: 255,
    nullable: true,
    name: 'status',
    default: 'pending',
  })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({
    name: 'tranfer_type_id',
  })
  @ManyToOne(
    () => TransactionTypeEntity,
    (transactionType) => transactionType.transactions,
  )
  @JoinColumn({ name: 'tranfer_type_id' })
  tranferTypeId: TransactionTypeEntity;
}
