import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ObjectType,
  Field,
} from '@nestjs/graphql';
import { EarthquakeService } from './earthquake.service';
import { Earthquake } from './entities/earthquake.entity';
import { CreateEarthquakeDto } from './dto/create-earthquake.input';
import { UpdateEarthquakeDto } from './dto/update-earthquake.input';
import { RemoveEarthquakeDto } from './dto/remove-earthquake.input';
import { PaginationResultDto } from './dto/pagination-result.dto';

@ObjectType()
class PaginatedEarthquakes {
  @Field(() => [Earthquake])
  earthquakes: Earthquake[];

  @Field(() => Int)
  totalCount: number;
}

@Resolver((of) => Earthquake)
export class EarthquakeResolver {
  constructor(private earthquakeService: EarthquakeService) {}

  @Query(() => [Earthquake])
  earthquakes() {
    return this.earthquakeService.findAll();
  }

  @Query(() => Earthquake, { nullable: true })
  earthquake(@Args('id', { type: () => Int }) id: number) {
    return this.earthquakeService.findOne(id);
  }

  @Query(() => PaginationResultDto)
  async getEarthquakes(
    @Args('page', { type: () => Int }) page: number,
    @Args('limit', { type: () => Int }) limit: number,
  ): Promise<PaginationResultDto> {
    return this.earthquakeService.findAllPaginated(page, limit);
  }

  @Mutation(() => Earthquake)
  createEarthquake(
    @Args('createEarthquakeDto') createEarthquakeDto: CreateEarthquakeDto,
  ) {
    return this.earthquakeService.create(createEarthquakeDto);
  }

  @Mutation(() => Earthquake)
  updateEarthquake(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateEarthquakeDto') updateEarthquakeDto: UpdateEarthquakeDto,
  ) {
    return this.earthquakeService.update(id, updateEarthquakeDto);
  }

  @Mutation(() => Earthquake)
  async removeEarthquake(@Args('id', { type: () => Int }) id: number) {
    const earthquake = await this.earthquakeService.findOne(id);
    if (!earthquake) {
      throw new Error('Earthquake not found');
    }
    await this.earthquakeService.remove(id);
    return earthquake;
  }
}
