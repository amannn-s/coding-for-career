"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

import { ClassAttributes, HTMLAttributes, ReactNode } from "react";
import { ExtraProps } from "react-markdown";

interface CodeComponentProps
  extends ClassAttributes<HTMLElement>,
    HTMLAttributes<HTMLElement>,
    ExtraProps {
  inline?: boolean;
  className?: string;
  children?: ReactNode;
}

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mt-6 mb-4 border-b border-gray-200 pb-2 text-3xl font-bold dark:border-gray-700">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-5 mb-3 text-2xl font-semibold">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-4 mb-2 text-xl font-semibold">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-3 mb-2 text-lg font-semibold">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="mt-2 mb-1 text-base font-semibold">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="mt-2 mb-1 text-sm font-semibold">{children}</h6>
          ),
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="mb-4 ml-4 list-inside list-disc space-y-1">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-4 ml-4 list-inside list-decimal space-y-1">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-700 dark:text-gray-300">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mb-4 rounded-r border-l-4 border-blue-500 bg-gray-50 py-2 pl-4 italic dark:bg-gray-800">
              {children}
            </blockquote>
          ),
          code: ({
            inline,
            className,
            children,
            ...props
          }: CodeComponentProps) => {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus as { [key: string]: React.CSSProperties }}
                language={match[1]}
                PreTag="div"
                className="mb-4 rounded-lg"
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-pink-600 dark:bg-gray-800 dark:text-pink-400"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => <>{children}</>,
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-blue-600 hover:underline dark:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="my-4 h-auto max-w-full rounded-lg shadow-md"
            />
          ),
          table: ({ children }) => (
            <div className="mb-4 overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-100 dark:bg-gray-800">{children}</thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-gray-300 dark:border-gray-700">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold dark:border-gray-700">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 px-4 py-2 dark:border-gray-700">
              {children}
            </td>
          ),
          hr: () => (
            <hr className="my-6 border-gray-300 dark:border-gray-700" />
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-gray-900 dark:text-gray-100">
              {children}
            </strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          del: ({ children }) => (
            <del className="text-gray-500 line-through">{children}</del>
          ),
          input: ({ checked, disabled, type }) => (
            <input
              type={type}
              checked={checked}
              disabled={disabled}
              className="mr-2 align-middle"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
