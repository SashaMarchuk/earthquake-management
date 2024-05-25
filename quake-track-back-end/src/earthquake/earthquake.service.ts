import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Earthquake } from './entities/earthquake.entity';
import { CreateEarthquakeDto } from './dto/create-earthquake.input';
import { UpdateEarthquakeDto } from './dto/update-earthquake.input';
import { PaginationResultDto } from './dto/pagination-result.dto';

@Injectable()
export class EarthquakeService {
  constructor(
    @InjectRepository(Earthquake)
    private readonly earthquakeRepository: Repository<Earthquake>,
  ) {}

  create(createEarthquakeDto: CreateEarthquakeDto): Promise<Earthquake> {
    const earthquake = this.earthquakeRepository.create(createEarthquakeDto);
    return this.earthquakeRepository.save(earthquake);
  }

  async createMany(
    createEarthquakeDtos: Partial<Earthquake>[],
  ): Promise<Earthquake[]> {
    const earthquakes = this.earthquakeRepository.create(createEarthquakeDtos);
    return this.earthquakeRepository.save(earthquakes);
  }

  findAll(): Promise<Earthquake[]> {
    return this.earthquakeRepository.find();
  }

  async findAllPaginated(
    page: number,
    limit: number,
  ): Promise<PaginationResultDto> {
    const [earthquakes, totalCount] =
      await this.earthquakeRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
        order: { id: 'DESC' },
      });
    return { earthquakes, totalCount };
  }

  async findOne(id: number): Promise<Earthquake> {
    const earthquake = await this.earthquakeRepository.findOne({
      where: { id },
    });
    if (!earthquake) {
      throw new NotFoundException(`Earthquake with ID ${id} not found`);
    }
    return earthquake;
  }

  async update(
    id: number,
    updateEarthquakeDto: UpdateEarthquakeDto,
  ): Promise<Earthquake> {
    const earthquake = await this.earthquakeRepository.preload({
      id,
      ...updateEarthquakeDto,
    });
    if (!earthquake) {
      throw new NotFoundException(`Earthquake with ID ${id} not found`);
    }
    return this.earthquakeRepository.save(earthquake);
  }

  async remove(id: number): Promise<void> {
    const result = await this.earthquakeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Earthquake with ID ${id} not found`);
    }
  }
}
