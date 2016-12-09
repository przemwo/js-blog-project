import React from 'react'
import { Link } from 'react-router'
import { config } from 'config'
import { rhythm } from 'utils/typography'
import { prefixLink } from 'gatsby-helpers'
import profilePic from './profile-pic.jpg'

class Bio extends React.Component {
  render () {
    return (
      <p
        style={{
          marginTop: rhythm(1),
          marginBottom: rhythm(1),
        }}
      >
        <img
          src={prefixLink(profilePic)}
          alt={`author ${config.authorName}`}
          style={{
            float: 'left',
            marginRight: rhythm(1/4),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '50%',
          }}
        />
      Hi! My name is <strong>{config.authorName}</strong>. I&apos;m a frontend developer who lives and works in Gdańsk, Poland.
      You can read more about me and this blog
      {' '}
      <Link
        style={{
          boxShadow: 'none',
          textDecoration: 'underline',
        }}
        to={prefixLink('/about/')}
        >
        here
      </Link>
      {' '}
      or visit my <a href="https://github.com/przemwo">GitHub profile</a> to see what I&apos;m doing right now.

      </p>
    )
  }
}

export default Bio
