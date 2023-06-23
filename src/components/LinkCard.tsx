import styles from './LinkCard.module.css'
import { JSDOM } from 'jsdom'

const ogpKey = ['title', 'image', 'description']

type Ogp = {
    title: string
    image: string
    description: string
}

const LinkCard = async ({ url }: { url: string }) => {
    const res = await fetch(new URL(url, 'http://localhost:3000/'), {
        headers: {
            'user-agent': 'bot',
        },
    })
    const text = await res.text()

    const dom = new JSDOM(text);
    const metaTag = dom.window.document.querySelectorAll('meta')

    const ogp = Object.fromEntries(
        Array.from(metaTag)
            .filter(e => e.hasAttribute('property'))
            .map(e => [e.getAttribute('property') ?? '', e] as const)
            .map(e => [e[0].match(/og:(.*)/)?.[1] ?? '', e[1]] as const)
            .filter(e => ogpKey.includes(e[0]))
            .map(e => [e[0], e[1].getAttribute('content')] as const)
    ) as Ogp

    return (
        <a href={url} className={styles.linkCard}>
            <img src={ogp.image} className={styles.img}></img>
            <span>{ogp.title}</span>
            <span>{ogp.description}</span>
            <span className={styles.url}>{url}</span>
        </a>
    )
}

export default LinkCard