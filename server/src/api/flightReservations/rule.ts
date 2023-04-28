import * as yup from 'yup';
import { IReqBodyCreateReservation } from './controller';
import { isValidTravelClass } from '../../utils';
import { ETravelClass } from '../../types';

yup.addMethod(yup.string, 'isTravelClass', function (message) {
  return this.test({ name: 'isTravelClass', message: 'its not a travel class type!', test: function (value) {
    const isValid = isValidTravelClass(value as ETravelClass);
    if (!isValid) {
      return this.createError({ path: this.path, message: message });
    }
    return true;
  } });
});

const passengerSchema = yup.object({
  full_name: yup.string()
    .strict(true)
    .required('full name field is required !'),
  email: yup.string()
    .strict(true)
    .required('email field is required !'),
  age: yup.string()
    .strict(true)
    .required('age field is required !'),
});

export const createReservationSchema = yup.object<IReqBodyCreateReservation>({
  user_id: yup.number().strict(true).required('user id field is required !'),
  flight_id: yup.number().strict(true).required('flight id field is required !'),
  passengers: yup.array()
    .of(passengerSchema)
    .test({
      message: 'at least one passenger required!',
      test: arr => arr.length > 0,
    }),
  travel_class: yup.string()
    .isTravelClass('it is not a travel class type!')
    .required('travel class field is required !'),
});
