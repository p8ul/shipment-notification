import React from 'react';

interface IProps {
  message: string;
  subtext?: string;
}
const Empty: React.FC<IProps> = ({ message, subtext='' }) => {
  return (
    <div className='empty'>
      <h3>{message}</h3>
      <p className="subtext">{subtext}</p>
    </div>
  );
};

export default Empty;
