"use client";

import { TiptapEditorDynamic } from "./_components/rich-text-editor/TiptapEditor";

const demoContent = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        textAlign: null,
        level: 1,
      },
      content: [
        {
          type: "text",
          text: "Getting started",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "Welcome to the ",
        },
        {
          type: "text",
          marks: [
            {
              type: "italic",
            },
          ],
          text: "Simple Editor",
        },
        {
          type: "text",
          text: " template! This template integrates ",
        },
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "open source",
        },
        {
          type: "text",
          text: " UI components and Tiptap extensions licensed under ",
        },
        {
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
          text: "MIT",
        },
        {
          type: "text",
          text: ".",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          type: "image",
          attrs: {
            src: "/img-example.jpg",
            alt: "A boring example image",
            title: "An example",
            width: null,
            height: null,
          },
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "Integrate it by following the ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://tiptap.dev/docs/ui-components/templates/simple-editor",
                target: "_blank",
                rel: "noopener noreferrer nofollow",
                class: null,
                title: null,
              },
            },
          ],
          text: "Tiptap UI Components docs",
        },
        {
          type: "text",
          text: " or using our CLI tool.",
        },
      ],
    },
    {
      type: "codeBlock",
      attrs: {
        language: null,
      },
      content: [
        {
          type: "text",
          text: "npx @tiptap/cli init",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        textAlign: null,
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "Features ",
        },
      ],
    },
    {
      type: "blockquote",
      content: [
        {
          type: "paragraph",
          attrs: {
            textAlign: null,
          },
          content: [
            {
              type: "text",
              marks: [
                {
                  type: "italic",
                },
              ],
              text: "A fully responsive rich text editor with built-in support for common formatting and layout tools. Type markdown ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "code",
                },
              ],
              text: "**",
            },
            {
              type: "text",
              marks: [
                {
                  type: "italic",
                },
              ],
              text: " or use keyboard shortcuts ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "code",
                },
              ],
              text: "⌘+B",
            },
            {
              type: "text",
              text: " for ",
            },
            {
              type: "text",
              marks: [
                {
                  type: "strike",
                },
              ],
              text: "most",
            },
            {
              type: "text",
              text: " all common markdown marks. 🪄",
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "Add images, customize alignment, and apply advanced formatting to make your writing more engaging and professional.",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "Superscript",
                },
                {
                  type: "text",
                  text: " (x2) and ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "Subscript",
                },
                {
                  type: "text",
                  text: " (H2O) for precision.",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "Typographic conversion",
                },
                {
                  type: "text",
                  text: ": automatically convert to ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                  text: "->",
                },
                {
                  type: "text",
                  text: " an arrow ",
                },
                {
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                  text: "→",
                },
                {
                  type: "text",
                  text: ".",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          type: "text",
          marks: [
            {
              type: "italic",
            },
          ],
          text: "→ ",
        },
        {
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://tiptap.dev/docs/ui-components/templates/simple-editor#features",
                target: "_blank",
                rel: "noopener noreferrer nofollow",
                class: null,
                title: null,
              },
            },
          ],
          text: "Learn more",
        },
      ],
    },
    {
      type: "horizontalRule",
    },
    {
      type: "heading",
      attrs: {
        textAlign: null,
        level: 2,
      },
      content: [
        {
          type: "text",
          text: "Make it your own",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          type: "text",
          text: "Switch between light and dark modes, and tailor the editor's appearance with customizable CSS to match your style.",
        },
      ],
    },
    {
      type: "bulletList",
      content: [
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  text: "Test template",
                },
              ],
            },
          ],
        },
        {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://tiptap.dev/docs/ui-components/templates/simple-editor",
                        target: "_blank",
                        rel: "noopener noreferrer nofollow",
                        class: null,
                        title: null,
                      },
                    },
                  ],
                  text: "Integrate the free template",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
    },
  ],
};

export default function Page() {
  return (
    <section className="grid min-h-dvh w-full items-start justify-center pt-40">
      <TiptapEditorDynamic content={demoContent} onUpdate={() => {}} />
    </section>
  );
}
