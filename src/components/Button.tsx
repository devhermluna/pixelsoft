import React from 'react';

interface Props {
  children: React.ReactNode;
  [rest:string]: any
}

const Button = ({ children, ...rest }: Props) => (
  <button className="bg-green-500 text-white w-full py-3 rounded-md" {...rest}>{children}</button>
);

export default Button;
