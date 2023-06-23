import fs from 'node:fs/promises'
import LinkCard from './LinkCard'

const ArticleList = async () => {
    const posts = await fs.readdir('posts/');

    return posts.map(post => <LinkCard key={post} url={post} />)
}

export default ArticleList