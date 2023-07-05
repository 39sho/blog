import Article from '@/components/Article'
import { Metadata } from 'next'
import fs from 'node:fs/promises'

export const generateMetadata = async ({ params: { post } }: { params: { post: string } }): Promise<Metadata> => {

    return {
        title: post,
        openGraph: {
            title: post,
            description: post,
            url: post,
            images: ["/opengraph-image.png"],
        },
    };
}

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