import { Company } from './company';
import { CompanyDto } from './company-dto';

export const firstCompanyDto: CompanyDto = {
  name: 'Romaguera-Crona',
  catchPhrase: 'Multi-layered client-server neural-net',
  bs: 'harness real-time e-markets'
};

export const secondCompanyDto: CompanyDto = {
  name: 'Deckow-Crist',
  catchPhrase: 'Proactive didactic contingency',
  bs: 'synergize scalable supply-chains'
};

export const firstCompany = new Company({
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    info: 'harness real-time e-markets'
});

export const secondCompany = new Company({
  name: 'Deckow-Crist',
  catchPhrase: 'Proactive didactic contingency',
  info: 'synergize scalable supply-chains'
});
