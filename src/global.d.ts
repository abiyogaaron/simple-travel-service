import * as yup from 'yup';

declare module 'yup' {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface StringSchema<TType, TContext, TDefault, TFlags> extends yup.StringSchema {
    isAirport(message: string): StringSchema
    isAirline(message: string): StringSchema
  }
}
