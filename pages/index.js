import React from 'react'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import { prefixLink } from 'gatsby-helpers'
import { rhythm, scale } from 'utils/typography'
import Helmet from "react-helmet"
import access from 'safe-access'
import { config } from 'config'
import include from 'underscore.string/include'
import Bio from 'components/Bio'
import Introduction from 'components/Introduction';

class BlogIndex extends React.Component {
  render () {
    const pageLinks = []
    // Sort pages.
    const sortedPages = sortBy(this.props.route.pages, (page) =>
      access(page, 'data.date')
    ).reverse()
    sortedPages.forEach((page) => {
      if (access(page, 'file.ext') === 'md' && !include(page.path, '/404') && !include(page.path, '/about/')) {
        const title = access(page, 'data.title') || page.path
        pageLinks.push(
          <li
            key={page.path}
            style={{
              ...scale(0.15),
              marginBottom: rhythm(1/4),
            }}
          >
            <Link style={{boxShadow: 'none'}} to={prefixLink(page.path)}>{title}</Link>
          </li>
        )
      }
    })
    return (
      <div>
        <Helmet
          title={config.blogTitle}
          meta={[
            {"name": "description", "content": "Javascript and frontend notes that I want to have close at hand."},
            {"name": "keywords", "content": "javascript, frontend"},
          ]}
        />
        <ul>
          {pageLinks}
        </ul>
        <hr
          style={{
            marginTop: rhythm(2),
            marginBottom: rhythm(1),
          }}
        />
        <Introduction />
      </div>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex
