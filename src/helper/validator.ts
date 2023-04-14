import { 
  AnyObject,
  ObjectSchema,
  ValidationError,
} from 'yup';

interface IValidateReturn {
  isValid: boolean;
  errMsg: string;
}
const validator = async <T>(
  schema: ObjectSchema<T extends AnyObject ? T : AnyObject>,
  value: T,
): Promise<IValidateReturn> => {
  try {
    await schema.validate(value);
    return { isValid: true, errMsg: '' };
  } catch (err) {
    const errObj = err as ValidationError;
    return { isValid: false, errMsg: errObj.errors[0] };
  }
};

export default validator;
