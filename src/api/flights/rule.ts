import * as yup from 'yup';
import { TReqBodyGetFlights } from './controller';
import { isValidAirline, isValidAirport } from '../../utils';
import { EAirline, EAirport } from '../../types';

yup.addMethod(yup.string, 'isAirport', function (message) {
  return this.test({ name: 'isAirport', message: 'airport field not an airport type !', test: function (value) {
    const isValid = isValidAirport(value as EAirport);
    if (!isValid) {
      return this.createError({ path: this.path, message: message });
    }
    return true;
  } });
});

yup.addMethod(yup.string, 'isAirline', function (message) {
  return this.test({ name: 'isAirline', message: 'airline field not an airline type !', test: function (value) {
    const isValid = isValidAirline(value as EAirline);
    if (!isValid) {
      return this.createError({ path: this.path, message: message });
    }
    return true;
  } });
});

export const getFlightsSchema = yup.object<TReqBodyGetFlights>({
  airport_from: yup.string()
    .strict(true)
    .isAirport('airport from field not an airport type !')
    .required('airport from field is required'),
  airport_destination: yup.string()
    .strict(true)
    .isAirport('airport destination field not an airport type !')
    .required('airport destination field is required'),
  departure_time: yup.string()
    .strict(true)
    .required('departure time is required'),
});
