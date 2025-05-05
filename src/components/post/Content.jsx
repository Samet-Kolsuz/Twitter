import React from 'react';

const Content = ({ text,image }) => {
  return (
    <div className="my-2">
      {text && <p>{text}</p>}

      {image && <img src={image} className="rounded-xl my-2" />}
    </div>
  );
};

export default Content;