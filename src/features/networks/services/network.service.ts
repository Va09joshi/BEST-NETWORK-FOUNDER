import { OperatorRepository } from '../repositories/operator.repository';
import { TowerRepository, NetworkScoreRepository } from '../repositories/tower.repository';

export class NetworkService {
  static async getAllOperators() {
    return await OperatorRepository.getAllOperators();
  }

  static async getTowersForLocation(locationId: string) {
    if (!locationId) throw new Error('Location ID is required');
    return await TowerRepository.getTowersByLocation(locationId);
  }

  static async getNetworkScoresForLocation(locationId: string) {
    if (!locationId) throw new Error('Location ID is required');
    return await NetworkScoreRepository.getScoresByLocation(locationId);
  }
}
