import { Dispatch, SetStateAction } from 'react';

const Input = ({
  value,
  placeholder,
  setValue
}: {
  value: string;
  placeholder: string;
  setValue: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <input
      value={value}
      placeholder={placeholder}
      type='text'
      onChange={(e) => setValue(e.target.value)}
      className='w-80 text-black px-3 rounded-md my-2'
    />
  );
};
export default Input;
