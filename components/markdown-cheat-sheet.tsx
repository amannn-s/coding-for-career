import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function MarkdownCheatSheet() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const sections = [
    {
      title: "Headers",
      items: [
        { syntax: "# H1", description: "Largest heading" },
        { syntax: "## H2", description: "Second level heading" },
        { syntax: "### H3", description: "Third level heading" },
        { syntax: "#### H4", description: "Fourth level heading" },
        { syntax: "##### H5", description: "Fifth level heading" },
        { syntax: "###### H6", description: "Smallest heading" },
      ],
    },
    {
      title: "Text Formatting",
      items: [
        { syntax: "**bold text**", description: "Bold text" },
        { syntax: "*italic text*", description: "Italic text" },
        { syntax: "***bold and italic***", description: "Bold and italic" },
        { syntax: "~~strikethrough~~", description: "Strikethrough text" },
        { syntax: "`inline code`", description: "Inline code" },
      ],
    },
    {
      title: "Lists",
      items: [
        {
          syntax: "- Item 1\n- Item 2\n- Item 3",
          description: "Unordered list",
        },
        {
          syntax: "1. First\n2. Second\n3. Third",
          description: "Ordered list",
        },
        {
          syntax: "- [x] Done\n- [ ] Todo",
          description: "Task list",
        },
        {
          syntax: "- Item\n  - Nested item",
          description: "Nested list",
        },
      ],
    },
    {
      title: "Links & Images",
      items: [
        { syntax: "[Link text](https://example.com)", description: "Link" },
        {
          syntax: "[Link with title](https://example.com 'Title')",
          description: "Link with title",
        },
        { syntax: "![Alt text](image.jpg)", description: "Image" },
        {
          syntax: "![Alt text](image.jpg 'Title')",
          description: "Image with title",
        },
      ],
    },
    {
      title: "Code Blocks",
      items: [
        {
          syntax: "```javascript\nconst x = 1;\n```",
          description: "JavaScript code block",
        },
        {
          syntax: "```python\nprint('Hello')\n```",
          description: "Python code block",
        },
        {
          syntax: "```typescript\ntype User = {};\n```",
          description: "TypeScript code block",
        },
        { syntax: "```html\n<div></div>\n```", description: "HTML code block" },
      ],
    },
    {
      title: "Blockquotes",
      items: [
        { syntax: "> This is a quote", description: "Single line quote" },
        {
          syntax: "> Line 1\n> Line 2\n> Line 3",
          description: "Multi-line quote",
        },
        {
          syntax: "> Level 1\n>> Level 2",
          description: "Nested quotes",
        },
      ],
    },
    {
      title: "Tables",
      items: [
        {
          syntax:
            "| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |",
          description: "Basic table",
        },
        {
          syntax:
            "| Left | Center | Right |\n|:-----|:------:|------:|\n| L    | C      | R     |",
          description: "Aligned table",
        },
      ],
    },
    {
      title: "Horizontal Rule",
      items: [
        { syntax: "---", description: "Three dashes" },
        { syntax: "***", description: "Three asterisks" },
        { syntax: "___", description: "Three underscores" },
      ],
    },
    {
      title: "Special Characters",
      items: [
        { syntax: "\\*escaped\\*", description: "Escape special characters" },
        { syntax: "<br>", description: "Line break" },
        { syntax: "&nbsp;", description: "Non-breaking space" },
      ],
    },
  ];

  return (
    <div className="">
      <div className="max-w-6xl mx-auto">
        {/* Sections Grid */}
        <div className="grid gap-6">
          {sections.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="bg-white dark:bg-slate-800 rounded-xl"
            >
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 pb-2 border-b-2 border-blue-500">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => {
                  const globalIndex = `${sectionIndex}-${itemIndex}`;
                  return (
                    <div
                      key={itemIndex}
                      className="group relative bg-slate-50 dark:bg-slate-700 rounded-lg p-4 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-200"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <code className="block text-sm font-mono text-pink-600 dark:text-pink-400 mb-1 whitespace-pre-wrap break-all">
                            {item.syntax}
                          </code>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            {item.description}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            copyToClipboard(item.syntax, globalIndex)
                          }
                          className="flex-shrink-0 p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-500 transition-colors duration-200"
                          title="Copy to clipboard"
                        >
                          {copiedIndex === globalIndex ? (
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-white dark:bg-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
              💡 Pro Tip
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Click the copy icon to quickly copy any syntax to your clipboard!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
