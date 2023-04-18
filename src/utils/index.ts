import { EAirline, EAirport } from '../types';

export const isValidAirline = (airline: EAirline) => {
  return Object.values(EAirline).includes(airline) || false;
};

export const isValidAirport = (airport: EAirport) => {
  return Object.values(EAirport).includes(airport) || false;
};
