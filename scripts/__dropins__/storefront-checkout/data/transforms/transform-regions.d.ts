import { GetRegionsQuery } from '../../__generated__/types';
import { Region as RegionModel } from '../models/region';

type RegionsCountry = NonNullable<GetRegionsQuery['country']>;
type AvailableRegions = RegionsCountry['available_regions'];
declare const transformRegions: (data: RegionsCountry['available_regions']) => RegionModel[] | undefined;
export { AvailableRegions, transformRegions };
//# sourceMappingURL=transform-regions.d.ts.map