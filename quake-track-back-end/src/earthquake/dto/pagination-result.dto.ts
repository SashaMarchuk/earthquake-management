import { Field, ObjectType } from '@nestjs/graphql';
import { Earthquake } from '../entities/earthquake.entity';

@ObjectType()
export class PaginationResultDto {
  @Field(() => [Earthquake])
  earthquakes: Earthquake[];

  @Field()
  totalCount: number;
}
