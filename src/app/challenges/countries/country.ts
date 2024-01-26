export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      cat: {
        official: string;
        common: string;
      };
    };
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
