import { Suspense } from "react"
import ReactMarkdown from "react-markdown"
import LinkCard from "./LinkCard";
import styles from './Article.module.css';

const Article = ({ markdown }: { markdown: string }) => (
    <ReactMarkdown components={{
        a: ({ href }) =>
            <span className={styles.outer}>
                <span className={styles.inner}>
                    <Suspense fallback={<span>Loading...</span>}>
                        <LinkCard url={href ?? ''} />
                    </Suspense>
                </span>
            </span>,
    }}>{markdown}</ReactMarkdown>
)

export default Article