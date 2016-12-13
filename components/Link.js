import React from 'react';

const Link = ({link}) => {
  link = link.split('||');
  return(
    <li><a href={link[1]}>{link[0]}</a></li>
  );
};

export default Link;
