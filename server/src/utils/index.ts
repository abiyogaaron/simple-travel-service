import { EAirline, EAirport, ETravelClass } from '../types';

export const isValidAirline = (airline: EAirline) => {
  return Object.values(EAirline).includes(airline) || false;
};

export const isValidAirport = (airport: EAirport) => {
  return Object.values(EAirport).includes(airport) || false;
};

export const isValidTravelClass = (travelClass: ETravelClass) => {
  return Object.values(ETravelClass).includes(travelClass) || false;
};
