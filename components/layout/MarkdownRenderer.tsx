import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const isInline = !className || !className.startsWith("language-");
            return isInline ? (
              <code
                className="bg-[#1C1C1C] border border-[#2A2A2A] text-[#D4AF37] px-1.5 py-0.5 rounded font-mono text-[11px]"
                {...props}
              >
                {children}
              </code>
            ) : (
              <pre className="bg-[#070707] border border-[#2A2A2A] p-4 rounded-lg my-3 overflow-x-auto text-[11px] font-mono leading-relaxed text-white">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
          p({ children }) {
            return <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>;
          },
          ul({ children }) {
            return <ul className="list-disc list-inside mb-3 pl-4 space-y-1">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal list-inside mb-3 pl-4 space-y-1">{children}</ol>;
          },
          li({ children }) {
            return <li className="text-[11px] md:text-xs text-[#8A8880] list-item">{children}</li>;
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-2 border-[#D4AF37] pl-4 italic my-3 text-white/60 bg-[#D4AF37]/5 py-2.5 pr-2 rounded-r-md">
                {children}
              </blockquote>
            );
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[#D4AF37] hover:underline inline-flex items-center gap-0.5"
              >
                {children}
              </a>
            );
          },
          h1({ children }) {
            return <h1 className="text-xl font-bold font-serif text-white mt-4 mb-2 uppercase tracking-wide">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-lg font-bold font-serif text-white mt-3 mb-2 uppercase tracking-wide">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-base font-bold font-serif text-white mt-2 mb-1 uppercase tracking-wide">{children}</h3>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
