import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EarthquakeService } from './earthquake.service';
import { EarthquakeResolver } from './earthquake.resolver';
import { Earthquake } from './entities/earthquake.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Earthquake])],
  providers: [EarthquakeService, EarthquakeResolver],
  exports: [EarthquakeService],
})
export class EarthquakeModule {}
