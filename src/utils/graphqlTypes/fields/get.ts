import Service from '../../../services/service';
import JWT from '../../auth/jwt';
import { LocationsResponse } from './types';

const service = new Service();
const jwt = new JWT();

export default {
  type: LocationsResponse,
  description: 'Filtered location list',
  async resolve(_: any, args: Get) {
    const filteredData = await service.getAll(args.limit, args.controller);
    return filteredData
  },
  args: service.getArgs,
};
