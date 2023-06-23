import Article from '@/components/Article'
import fs from 'node:fs/promises'

export const generateStaticParams = async () => {
    const posts = await fs.readdir('posts/');

    return posts.map((post) => ({
        post,
    }))
}

const Post = async ({ params: { post } }: { params: { post: string } }) => {
    const markdown = (await fs.readFile(`posts/${post}`)).toString()

    return <Article markdown={markdown} />
}

export default Post