import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Earthquake {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  location: string;

  @Field()
  @Column('decimal')
  magnitude: number;

  @Field(() => GraphQLISODateTime)
  @Column()
  date: Date;
}
