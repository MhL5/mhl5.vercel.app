"use client";

import { Badge } from "@/components/ui/badge";

import { TiptapEditorDynamic } from "./_components/rich-text-editor/TiptapEditor";

export const htmlContent = `
<h1 id="7fb7c5df-33d5-428f-bd5d-997520a4795b" data-toc-id="7fb7c5df-33d5-428f-bd5d-997520a4795b">Editor Demo — All Features  </h1><p>This document shows every feature: <strong>bold</strong>, <em>italic</em>, <s>strikethrough</s>, inline <code>code</code>, and a <a target="_blank" rel="noopener noreferrer" href="https://tiptap.dev">link</a>. Typography: → and ….</p><p>Table of contents with ONE Click</p><ul><li><p><a target="_self" rel="noopener noreferrer" href="#7fb7c5df-33d5-428f-bd5d-997520a4795b">Editor Demo — All Features</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#d5d73dc7-f698-4831-b197-f6321542eb1c">Blockquote</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#c1504bde-2843-4b6b-af9f-de9aac984ed3">Lists</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#bf1ca4c8-82f2-4004-b850-a9da8ebb7100">Code block</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#0d151764-0dbd-4bee-9323-e46381ba9b31">Media</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#9530c44b-cae9-425f-b234-b031f66656b3">Table</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#c416531c-fc2c-428c-8641-e72ee86f2227">Alignment &amp; resizer</a></p></li></ul><p><br></p><h2 id="d5d73dc7-f698-4831-b197-f6321542eb1c" data-toc-id="d5d73dc7-f698-4831-b197-f6321542eb1c">Blockquote</h2><blockquote><p>A blockquote for emphasis. Use it to highlight a key idea or quote.</p></blockquote><p></p><p><a target="_blank" rel="noopener noreferrer" href="https://localhost:12000">link: <strong>click me</strong></a></p><h2 id="c1504bde-2843-4b6b-af9f-de9aac984ed3" data-toc-id="c1504bde-2843-4b6b-af9f-de9aac984ed3">Lists</h2><ul><li><p>Bullet one</p></li><li><p>Bullet two</p></li></ul><ol><li><p>First step</p></li><li><p>Second step</p></li></ol><h2 id="bf1ca4c8-82f2-4004-b850-a9da8ebb7100" data-toc-id="bf1ca4c8-82f2-4004-b850-a9da8ebb7100">Code block</h2><pre><code>function demo() {
  return "Hello, editor.";
}</code></pre><hr><h2 id="0d151764-0dbd-4bee-9323-e46381ba9b31" data-toc-id="0d151764-0dbd-4bee-9323-e46381ba9b31">Media</h2><img src="/img-example.jpg" alt="Example image" width="448" height="254"><video class="rounded-md max-w-full h-auto" src="/video-example.mp4" controls="" preload="metadata" playsinline="" style="max-width: 100%; height: auto;"></video><audio controls="" preload="metadata" src="https://www.w3schools.com/html/horse.ogg"></audio><div data-youtube-video=""><iframe width="640" height="360" allowfullscreen="true" autoplay="false" disablekbcontrols="false" enableiframeapi="false" endtime="0" ivloadpolicy="0" loop="false" modestbranding="false" origin="" playlist="" rel="1" src="https://www.youtube.com/embed/Ukt2gVz25PQ?si=nnhGACnLotj4WugY" start="0"></iframe></div><h2 id="9530c44b-cae9-425f-b234-b031f66656b3" data-toc-id="9530c44b-cae9-425f-b234-b031f66656b3">Table</h2><div class="tableWrapper"><table style="min-width: 365px;"><colgroup><col style="width: 138px;"><col style="width: 202px;"><col style="min-width: 25px;"></colgroup><tbody><tr><th colspan="1" rowspan="1" colwidth="138"><p>Header A</p></th><th colspan="1" rowspan="1" colwidth="202"><p>Header B</p></th><th colspan="1" rowspan="1"><p>sad</p></th></tr><tr><td colspan="1" rowspan="1" colwidth="138"><p>Cell 1</p></td><td colspan="1" rowspan="1" colwidth="202"><p>Cell 2sada</p></td><td colspan="1" rowspan="1"><p>sadsadsadsa</p></td></tr><tr><td colspan="1" rowspan="1" colwidth="138"><p>Cell</p></td><td colspan="1" rowspan="1" colwidth="202"><p>Cell 4</p></td><td colspan="1" rowspan="1"><p>sadsa</p></td></tr></tbody></table></div><h2 id="c416531c-fc2c-428c-8641-e72ee86f2227" data-toc-id="c416531c-fc2c-428c-8641-e72ee86f2227">Alignment &amp; resizer</h2><p style="text-align: center;">This paragraph is centered.</p><p style="text-align: right;">This paragraph is right-aligned.</p><hr><div data-type="asset-upload-node" data-media-type="image" accept="image/*" limit="1" maxsize="0"></div><div data-type="asset-upload-node" data-media-type="video" accept="image/*" limit="1" maxsize="0"></div><div data-type="asset-upload-node" data-media-type="audio" accept="image/*" limit="1" maxsize="0"></div><p></p>
`;

export default function EditorDemo() {
  return (
    <>
      <Badge
        variant="warning"
        className="mx-auto mb-8 block px-3 py-2 text-3xl"
      >
        Editor BETA
      </Badge>
      <TiptapEditorDynamic
        content={htmlContent}
        onUpdate={({ editor }) => {
          // eslint-disable-next-line no-console
          console.log(editor.getHTML());
        }}
      />
    </>
  );
}
