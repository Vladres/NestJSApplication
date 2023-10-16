import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityMembersDto, CityPopulationDto, PopulationDto } from './dto';
import { ResidentEntity } from './entities';
import { IRawCityMember } from './contracts';

@Injectable()
export class PopulationService {
  constructor(
    @InjectRepository(ResidentEntity)
    private residentRepository: Repository<ResidentEntity>,
  ) {}

  protected mapToCityMembersDto(
    rawCityMembers: IRawCityMember[],
  ): CityMembersDto[] {
    const cityMembersMap = new Map<string, CityMembersDto>();

    rawCityMembers.forEach((row) => {
      const { city, first_name, count } = row;

      if (cityMembersMap.has(city)) {
        cityMembersMap.get(city).members.push({ first_name, count });
      } else {
        cityMembersMap.set(city, { city, members: [{ first_name, count }] });
      }
    });

    return Array.from(cityMembersMap.values());
  }

  protected async getFilteredCityMembers(
    partialCityName: string = '',
  ): Promise<CityMembersDto[]> {
    const rawCityMembers: IRawCityMember[] =
      await this.residentRepository.query(
        `
      SELECT cities.name AS city, residents.first_name AS first_name, COUNT(residents.id) AS count
      FROM
        residents
      INNER JOIN
        cities ON residents.city_id = cities.id
      WHERE
        cities.name ILIKE $1
      GROUP BY
        cities.name, residents.first_name;
      `,
        [`%${partialCityName}%`],
      );

    /**
     * As of my last knowledge update in September 2021, PostgreSQL does not support directly nesting aggregate functions,
     * regardless of the version. This means you cannot directly use an aggregate function (e.g., json_agg)
     * within another aggregate function in a single SQL query
     * */
    return this.mapToCityMembersDto(rawCityMembers);
  }

  protected async getFilteredCitiesPopulation(
    partialCityName: string = '',
  ): Promise<CityPopulationDto[]> {
    const query = `
      SELECT cities.name, COUNT(residents.id) AS count
      FROM residents
      INNER JOIN cities ON residents.city_id = cities.id
      WHERE cities.name ILIKE $1
      GROUP BY cities.name
      ORDER BY count DESC;
    `;

    const filteredCitiesPopulation = await this.residentRepository.query(
      query,
      [`%${partialCityName}%`],
    );
    return filteredCitiesPopulation;
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
      throw new InternalServerErrorException(
        error.message || 'Unable to fetch population.',
      );
    }
  }
}
