import { LocationRepository } from '../repositories/location.repository';
import { SearchQuerySchema } from '../types';
import { BadRequestError, NotFoundError } from '../../../core/errors/ErrorHandler';

export class SearchService {
  static async searchByQuery(query: string) {
    const validation = SearchQuerySchema.safeParse({ query });
    if (!validation.success) {
      throw new BadRequestError(validation.error.message);
    }

    return await LocationRepository.searchLocations(validation.data.query);
  }

  static async getLocationDetails(id: string) {
    if (!id) throw new BadRequestError('Location ID is required');
    
    const location = await LocationRepository.getLocationById(id);
    if (!location) {
      throw new NotFoundError('Location not found');
    }
    
    return location;
  }
}
