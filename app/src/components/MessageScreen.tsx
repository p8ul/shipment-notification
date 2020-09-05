import React from 'react';

interface IProps {}

const MessageScreen: React.FC<IProps> = () => {
  return (
    <div className='page-container'>
      <div className='outside'>
        <div className='line line-left'></div>
        <div className='line line-right'></div>
        <div className='overlay outer__border-radius'></div>
        <div className='inside'>
          <div className='overlay inner__border-radius'></div>
          <div className='speaker'>
            <div className='dot'></div>
            <div className='dot'></div>
            <div className='dot'></div>
            <div className='dot'></div>
            <div className='dot'></div>
            <div className='dot'></div>
            <div className='dot'></div>
            <div className='dot'></div>
            <div className='dot'></div>
            <div className='dot'></div>
          </div>
          <div>heloasfasfajjjkjkjkjkjkkkjkkjkjkjkjkj
              </div>
              <div>asdfadfa</div>
        </div>
      </div>
    </div>
  );
};

export default MessageScreen;
