import React from 'react'
import { Link } from 'react-router'
import { Container } from 'react-responsive-grid'
import { prefixLink } from 'gatsby-helpers'
import { rhythm, scale } from 'utils/typography'
import { config } from 'config'

class Template extends React.Component {
  render () {
    const { location, children } = this.props
    let header
    if (location.pathname === prefixLink('/')) {
      header = (
        <div>
          <h1
            style={{
              ...scale(1.5),
              marginBottom: rhythm(1.5),
              marginTop: 0,
              marginBottom: 0
            }}
            >
            <Link
              style={{
                boxShadow: 'none',
                textDecoration: 'none',
                color: 'inherit',
              }}
              to={prefixLink('/')}
              >
              {config.blogTitle}
            </Link>
          </h1>
          <h3
            style={{
              ...scale(-0.2),
              marginTop: rhythm(0.5),
              marginBottom: rhythm(0.5),
            }}>
            Javascript and frontend development notes that I want to have close at hand...
          </h3>
          <hr
            style={{
              marginBottom: rhythm(2),
            }}
          />
        </div>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={prefixLink('/')}
          >
            {config.blogTitle}
          </Link>
        </h3>
      )
    }
    return (
      <Container
        style={{
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3/4)}`,
        }}
      >
        {header}
        {children}
      </Container>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.any,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template
