import React from 'react'
import moment from 'moment'
import Helmet from "react-helmet"
import ReadNext from '../components/ReadNext'
import { rhythm } from 'utils/typography'
import { config } from 'config'
import Bio from 'components/Bio'
import Links from 'components/Links';

import '../css/zenburn.css'

class MarkdownWrapper extends React.Component {
  render () {
    const { route } = this.props
    const post = route.page.data
    const links = post.links;

    return (
      <div className="markdown">
        <Helmet
          title={`${post.title} | ${config.blogTitle}`}
        />
        <h1 style={{marginTop: 0}}>{post.title}</h1>
        <div style={{ marginTop: "-2em" }}>
          <em
            style={{
              display: 'block',
              marginBottom: rhythm(1),
            }}
          >
            Posted {moment(post.date).format('MMMM D, YYYY')}
          </em>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
        {(route.page.data.title !== "About me and this blog") &&
          <div>
            {links && links.length > 0 && <Links links={links} />}
            <hr
              style={{
                marginBottom: rhythm(2),
              }}
            />
            <ReadNext post={post} pages={route.pages} />
            <Bio />
          </div>
        }
      </div>
    )
  }
}

MarkdownWrapper.propTypes = {
  route: React.PropTypes.object,
}

export default MarkdownWrapper
