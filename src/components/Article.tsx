import { Suspense } from "react"
import ReactMarkdown from "react-markdown"
import LinkCard from "./LinkCard";

const Article = ({ markdown }: { markdown: string }) => (
    <ReactMarkdown components={{
        a: ({href}) =>
            <Suspense fallback={<span>Loading...</span>}>
                <LinkCard url={href ?? ''} />
            </Suspense>,
    }}>{markdown}</ReactMarkdown>
)

export default Article