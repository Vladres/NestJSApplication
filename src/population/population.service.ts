import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from '../db';
import { CityMembersDto, CityPopulationDto, PopulationDto } from './dto';

@Injectable()
export class PopulationService {
  constructor(@Inject(PG_CONNECTION) private conn: Pool) {}

  protected async getFilteredCityMembers(
    partialCityName: string = '',
  ): Promise<CityMembersDto[]> {
    try {
      const query = `
        SELECT cities.name AS city, residents.first_name, COUNT(residents.id) AS count
        FROM residents
        INNER JOIN cities ON residents.city_id = cities.id
        WHERE cities.name ILIKE '%${partialCityName}%'
        GROUP BY cities.name, residents.first_name;
      `;

      const cityMembers = await this.conn.query<CityMembersDto>(query);
      return cityMembers.rows;
    } catch (error) {
      throw new HttpException(
        error.message || 'Unable to fetch city members.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  protected async getFilteredCitiesPopulation(
    partialCityName: string = '',
  ): Promise<CityPopulationDto[]> {
    try {
      const query = `
        SELECT cities.name AS city, COUNT(residents.id) AS count
        FROM residents
        INNER JOIN cities ON residents.city_id = cities.id
        WHERE cities.name ILIKE '%${partialCityName}%'
        GROUP BY cities.name
        ORDER BY count DESC;
      `;

      const filteredCitiesPopulation =
        await this.conn.query<CityPopulationDto>(query);
      return filteredCitiesPopulation.rows;
    } catch (error) {
      throw new HttpException(
        error.message || 'Unable to fetch filtered cities population.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getPopulationData(
    partialCityName?: string,
  ): Promise<PopulationDto> {
    try {
      const citiesPopulation =
        await this.getFilteredCitiesPopulation(partialCityName);
      const cityMembers = await this.getFilteredCityMembers(partialCityName);

      return {
        cities_population: citiesPopulation,
        city_members: cityMembers,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Unable to fetch population.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
