import { ComponentChildren } from 'preact';
import { Country as CountryModel } from '../data/models/country';

type Context = {
    countries?: CountryModel[];
};
type CountriesProps = {
    children: ComponentChildren;
};
declare function CountriesProvider({ children }: CountriesProps): import("preact").JSX.Element;
declare function useCountries(): Context;
export { CountriesProvider, useCountries };
//# sourceMappingURL=countries.d.ts.map