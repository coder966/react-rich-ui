import RruOption from "../../types/RruOption";

interface FormInitialValues {
  [key: string]: string | number | boolean | RruOption | string[] | number[] | RruOption[];
}

export default FormInitialValues;
