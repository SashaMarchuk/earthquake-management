import { Test, TestingModule } from '@nestjs/testing';
import { EarthquakeResolver } from './earthquake.resolver';
import { EarthquakeService } from './earthquake.service';

describe('EarthquakeResolver', () => {
  let resolver: EarthquakeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EarthquakeResolver, EarthquakeService],
    }).compile();

    resolver = module.get<EarthquakeResolver>(EarthquakeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
