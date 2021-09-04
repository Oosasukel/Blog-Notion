import { DiscussionEmbed } from 'disqus-react'
import styles from './disqus.module.css'
import * as config from 'lib/config'
import { useEffect, useRef } from 'react'

interface DisqusCommentsProps {
  post: {
    id: string
    title: string
  }
}

const DisqusComments = ({ post }: DisqusCommentsProps) => {
  const disqusShortname = config.disqusShortname
  if (!disqusShortname) return null

  const disqusRef = useRef<DiscussionEmbed>()

  const disqusConfig = {
    url: `https://${config.domain}/${post.id}`,
    identifier: post.id,
    title: post.title
  }

  useEffect(() => {
    const updateDisqus = () => {
      disqusRef.current.forceUpdate()
    }

    document.addEventListener('themeChanged', updateDisqus)

    return () => {
      document.removeEventListener('themeChanged', updateDisqus)
    }
  }, [])

  return (
    <div className={styles.commentsContainer}>
      <DiscussionEmbed
        ref={disqusRef}
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  )
}

export default DisqusComments
