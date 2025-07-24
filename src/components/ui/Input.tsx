import React from 'react';

interface InputProps {
  id: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  id,
  type = 'text',
  label,
  name,
  value,
  onChange,
}: InputProps) => {
  const inputId = `input-${id}-${name}`;
  return (
    <label className='inline-block w-full'>
      <span className='font-medium capitalize'>{label}</span>
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className='w-full rounded-lg border bg-white px-2 py-1'
      />
    </label>
  );
};

export { Input };
