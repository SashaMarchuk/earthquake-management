import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class RemoveEarthquakeDto {
  @Field()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
