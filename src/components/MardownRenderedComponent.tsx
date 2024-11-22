import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownRenderedComponent: React.FC<{ content: string }> = ({
  content,
}) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ ...props }) => (
          <h1 className="text-xl my-5 break-words font-semibold" {...props} />
        ),

        h2: ({ ...props }) => (
          <h2 className="text-lg font-semibold my-5 break-words" {...props} />
        ),

        h3: ({ ...props }) => (
          <h3 className="text-base font-semibold my-3 break-words" {...props} />
        ),

        p: ({ ...props }) => <p className="text-md break-words" {...props} />,

        li: ({ ...props }) => (
          <li className="text-md break-words my-2" {...props} />
        ),

        strong: ({ ...props }) => (
          <strong className="text-md break-words" {...props} />
        ),

        a: ({ ...props }) => (
          <a
            className="text-md link link-primary "
            target="_blank"
            {...props}
          />
        ),

        img: ({ ...props }) => (
          <div className="flex justify-center my-2">
            <img className="rounded-xl shadow-lg" {...props} />
          </div>
        ),

        ul: ({ ...props }) => <ul className="list-disc pl-5 my-2" {...props} />,

        ol: ({ ...props }) => (
          <ol className="list-decimal pl-5 my-2" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderedComponent;
