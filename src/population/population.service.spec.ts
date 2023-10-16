import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResidentEntity } from './entities';
import { PopulationService } from './population.service';

// Mocked data
const mockRawCitiesPopulation = [
  { city: 'New York City', count: 100 },
  { city: 'Los Angeles', count: 150 },
  // Add more test data as needed
];

describe('PopulationService', () => {
  let populationService: PopulationService;
  let residentRepository: Repository<ResidentEntity>;

  const mockResidentRepository = {
    query: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PopulationService,
        {
          provide: getRepositoryToken(ResidentEntity),
          useValue: mockResidentRepository,
        },
      ],
    }).compile();

    populationService = module.get<PopulationService>(PopulationService);
    residentRepository = module.get<Repository<ResidentEntity>>(
      getRepositoryToken(ResidentEntity),
    );
  });

  describe('getFilteredCityMembers', () => {
    it('should return empty array for unknown partial city name', async () => {
      const partialCityName = 'Unknown City';
      mockResidentRepository.query.mockResolvedValueOnce([]);

      const result = await (populationService as any).getFilteredCityMembers(
        partialCityName,
      );

      expect(mockResidentRepository.query).toHaveBeenCalledWith(
        expect.any(String),
        [`%${partialCityName}%`],
      );
      expect(result).toEqual([]);
    });
  });

  describe('getFilteredCitiesPopulation', () => {
    it('should return filtered cities population for a given partial city name', async () => {
      const partialCityName = 'New York';
      mockResidentRepository.query.mockResolvedValueOnce(
        mockRawCitiesPopulation,
      );

      const result = await (
        populationService as any
      ).getFilteredCitiesPopulation(partialCityName);

      expect(mockResidentRepository.query).toHaveBeenCalledWith(
        expect.any(String),
        [`%${partialCityName}%`],
      );
      expect(result).toEqual(mockRawCitiesPopulation);
    });

    it('should return empty array for unknown partial city name', async () => {
      const partialCityName = 'Unknown City';
      mockResidentRepository.query.mockResolvedValueOnce([]);

      const result = await (
        populationService as any
      ).getFilteredCitiesPopulation(partialCityName);

      expect(mockResidentRepository.query).toHaveBeenCalledWith(
        expect.any(String),
        [`%${partialCityName}%`],
      );
      expect(result).toEqual([]);
    });
  });

  describe('getPopulationData', () => {
    it('should return population data for a given partial city name', async () => {
      const partialCityName = 'New York';
      mockResidentRepository.query.mockResolvedValueOnce(
        mockRawCitiesPopulation,
      );
      mockResidentRepository.query.mockResolvedValueOnce([{
        city: 'New York City',
        first_name: 'John',
        count: 1,
      }]);

      const result = await populationService.getPopulationData(partialCityName);

      expect(mockResidentRepository.query).toHaveBeenCalledWith(
        expect.any(String),
        [`%${partialCityName}%`],
      );
      expect(result).toEqual({
        cities_population: mockRawCitiesPopulation,
        city_members: [
          {
            city: 'New York City',
            members: [{ first_name: 'John', count: 1 }],
          },
        ],
      });
    });

    it('should return empty array for unknown partial city name', async () => {
      const partialCityName = 'Unknown City';
      mockResidentRepository.query.mockResolvedValueOnce([]);
      mockResidentRepository.query.mockResolvedValueOnce([]);

      const result = await populationService.getPopulationData(partialCityName);

      expect(mockResidentRepository.query).toHaveBeenCalledWith(
        expect.any(String),
        [`%${partialCityName}%`],
      );
      expect(result).toEqual({
        cities_population: [],
        city_members: [],
      });
    });
  });
});
