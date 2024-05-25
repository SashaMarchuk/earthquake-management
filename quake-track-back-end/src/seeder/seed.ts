import { Injectable } from '@nestjs/common';
import { EarthquakeService } from '../earthquake/earthquake.service';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { Earthquake } from '../earthquake/entities/earthquake.entity';

@Injectable()
export class Seeder {
  constructor(private readonly earthquakeService: EarthquakeService) {}

  async seedDatabase() {
    const earthquakes = await this.earthquakeService.findAll();

    if (earthquakes.length > 0) {
      console.log('Earthquakes already exist. Skipping seeding.');
      return;
    }

    console.log('Seeding earthquakes from CSV...');
    const csvFilePath = 'src/migration/earthquakes1970-2014.csv';
    const newEarthquakes: Partial<Earthquake>[] = [];

    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
          const earthquake: Partial<Earthquake> = {
            location: `${row.Latitude}, ${row.Longitude}`,
            magnitude: parseFloat(row.Magnitude),
            date: new Date(row.DateTime),
          };
          newEarthquakes.push(earthquake);
        })
        .on('end', async () => {
          try {
            await this.earthquakeService.createMany(newEarthquakes);
            console.log('Seeding completed.');
            resolve();
          } catch (error) {
            console.error('Seeding failed:', error);
            reject(error);
          }
        });
    });
  }
}
