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
  region: string;
  subregion: string;
  population: number;
  continents: string[];
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
}
