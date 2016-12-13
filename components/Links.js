import React from 'react';
import { rhythm, scale } from 'utils/typography';
import Link from './Link';

const Links = ({links}) => {
  return(
    <div
    style={{
      marginBottom: rhythm(2),
    }}>
      <h3
      style={{
        marginTop: rhythm(2),
      }}>
        You might also be interested in these:
      </h3>
      <ul>
        {links.map((link, index) => <Link key={index} link={link} />)}
      </ul>
    </div>
  );
};

export default Links;
