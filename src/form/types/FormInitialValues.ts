import Option from '../input/types/Option';

interface FormInitialValues {
  [key: string]: string | number | Option | string[] | number[] | Option[];
}

export default FormInitialValues;
