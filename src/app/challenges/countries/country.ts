export interface Country {
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
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: any;
  idd: {
    root: '+3';
    suffixes: ['76'];
  };
  capital: string[];
  region: Regions;
  languages: any;
  subregion: string;
  population: number;
  continents: string[];
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
}

export enum Regions {
  Africa = 'Africa',
  America = 'Americas',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania',
}
