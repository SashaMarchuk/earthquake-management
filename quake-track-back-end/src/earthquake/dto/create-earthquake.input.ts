import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { GraphQLISODateTime } from '@nestjs/graphql';

@InputType()
export class CreateEarthquakeDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  location: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  magnitude: number;

  @Field(() => GraphQLISODateTime)
  @IsNotEmpty()
  date: string;
}
