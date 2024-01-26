export interface Country {
  borders: string[];
  parsedBorders: { [key: string]: string }[];
  capital: string[];
  cca3: string;
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  continents: string[];
  commonCurrencyName: string;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  independent: boolean;
  languages: any;
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
    commonNativeName: string;
  };
  population: number;
  region: Regions;
  status: string;
  subregion: string;
  tld: string[];
  unMember: boolean;
}

export enum Regions {
  Africa = 'Africa',
  America = 'Americas',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania',
}
