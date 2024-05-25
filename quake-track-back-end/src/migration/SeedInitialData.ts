import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { Earthquake } from '../earthquake/entities/earthquake.entity';

export class SeedInitialData implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const earthquakeRepository = getRepository(Earthquake);
    const csvFilePath = 'src/migration/earthquakes1970-2014.csv';

    await new Promise<void>((resolve, reject) => {
      const earthquakes: Partial<Earthquake>[] = [];

      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
          const earthquake: Partial<Earthquake> = {
            location: `${row.Latitude}, ${row.Longitude}`,
            magnitude: parseFloat(row.Magnitude),
            date: new Date(row.DateTime),
          };
          earthquakes.push(earthquake);
        })
        .on('end', async () => {
          try {
            await earthquakeRepository.save(earthquakes);
            resolve();
          } catch (error) {
            reject(error);
          }
        });
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const earthquakeRepository = getRepository(Earthquake);
    await earthquakeRepository.clear();
  }
}
