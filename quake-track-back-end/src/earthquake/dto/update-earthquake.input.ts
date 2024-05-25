import { InputType, PartialType } from '@nestjs/graphql';
import { CreateEarthquakeDto } from './create-earthquake.input';

@InputType()
export class UpdateEarthquakeDto extends PartialType(CreateEarthquakeDto) {}
