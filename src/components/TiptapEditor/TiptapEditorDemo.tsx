"use client";

import { TiptapEditorDynamic } from "@/components/TiptapEditor/TiptapEditor";
import { TiptapContentRenderer } from "@/components/TiptapEditor/components/TiptapContentRenderer";
import type { editorMessages } from "@/components/TiptapEditor/i18n/messages";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const htmlContent = {
  en: `
<h1 id="7fb7c5df-33d5-428f-bd5d-997520a4795b" data-toc-id="7fb7c5df-33d5-428f-bd5d-997520a4795b">Editor Demo — All Features  </h1><p>This document shows every feature: <strong>bold</strong>, <em>italic</em>, <s>strikethrough</s>, inline <code>code</code>, and a <a target="_blank" rel="noopener noreferrer" href="https://tiptap.dev">link</a>. Typography: → and ….</p><p>Table of contents with ONE Click</p><ul><li><p><a target="_self" rel="noopener noreferrer" href="#7fb7c5df-33d5-428f-bd5d-997520a4795b">Editor Demo — All Features</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#d5d73dc7-f698-4831-b197-f6321542eb1c">Blockquote</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#c1504bde-2843-4b6b-af9f-de9aac984ed3">Lists</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#bf1ca4c8-82f2-4004-b850-a9da8ebb7100">Code block</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#0d151764-0dbd-4bee-9323-e46381ba9b31">Media</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#9530c44b-cae9-425f-b234-b031f66656b3">Table</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#c416531c-fc2c-428c-8641-e72ee86f2227">Alignment &amp; resizer</a></p></li></ul><p><br></p><h2 id="d5d73dc7-f698-4831-b197-f6321542eb1c" data-toc-id="d5d73dc7-f698-4831-b197-f6321542eb1c">Blockquote</h2><blockquote><p>A blockquote for emphasis. Use it to highlight a key idea or quote.</p></blockquote><p></p><p><a target="_blank" rel="noopener noreferrer" href="https://localhost:12000">link: <strong>click me</strong></a></p><h2 id="c1504bde-2843-4b6b-af9f-de9aac984ed3" data-toc-id="c1504bde-2843-4b6b-af9f-de9aac984ed3">Lists</h2><ul><li><p>Bullet one</p></li><li><p>Bullet two</p></li></ul><ol><li><p>First step</p></li><li><p>Second step</p></li></ol><h2 id="bf1ca4c8-82f2-4004-b850-a9da8ebb7100" data-toc-id="bf1ca4c8-82f2-4004-b850-a9da8ebb7100">Code block</h2><pre><code>function demo() {
  return "Hello, editor.";
}</code></pre><hr><h2 id="0d151764-0dbd-4bee-9323-e46381ba9b31" data-toc-id="0d151764-0dbd-4bee-9323-e46381ba9b31">Media</h2><img src="/img-example.jpg" alt="Example image" width="448" height="254"><video class="rounded-md max-w-full h-auto" src="/video-example.mp4" controls="" preload="metadata" playsinline="" style="max-width: 100%; height: auto;"></video><audio controls="" preload="metadata" src="https://www.w3schools.com/html/horse.ogg"></audio><div data-youtube-video=""><iframe width="640" height="360" allowfullscreen="true" autoplay="false" disablekbcontrols="false" enableiframeapi="false" endtime="0" ivloadpolicy="0" loop="false" modestbranding="false" origin="" playlist="" rel="1" src="https://www.youtube.com/embed/Ukt2gVz25PQ?si=nnhGACnLotj4WugY" start="0"></iframe></div><h2 id="9530c44b-cae9-425f-b234-b031f66656b3" data-toc-id="9530c44b-cae9-425f-b234-b031f66656b3">Table</h2><div class="tableWrapper"><table style="min-width: 365px;"><colgroup><col style="width: 138px;"><col style="width: 202px;"><col style="min-width: 25px;"></colgroup><tbody><tr><th colspan="1" rowspan="1" colwidth="138"><p>Header A</p></th><th colspan="1" rowspan="1" colwidth="202"><p>Header B</p></th><th colspan="1" rowspan="1"><p>sad</p></th></tr><tr><td colspan="1" rowspan="1" colwidth="138"><p>Cell 1</p></td><td colspan="1" rowspan="1" colwidth="202"><p>Cell 2sada</p></td><td colspan="1" rowspan="1"><p>sadsadsadsa</p></td></tr><tr><td colspan="1" rowspan="1" colwidth="138"><p>Cell</p></td><td colspan="1" rowspan="1" colwidth="202"><p>Cell 4</p></td><td colspan="1" rowspan="1"><p>sadsa</p></td></tr></tbody></table></div><h2 id="c416531c-fc2c-428c-8641-e72ee86f2227" data-toc-id="c416531c-fc2c-428c-8641-e72ee86f2227">Alignment &amp; resizer</h2><p style="text-align: center;">This paragraph is centered.</p><p style="text-align: right;">This paragraph is right-aligned.</p><hr><div data-type="asset-upload-node" data-media-type="image" accept="image/*" limit="1" maxsize="0"></div><div data-type="asset-upload-node" data-media-type="video" accept="image/*" limit="1" maxsize="0"></div><div data-type="asset-upload-node" data-media-type="audio" accept="image/*" limit="1" maxsize="0"></div><p></p>
`,
  fa: `
<h1 id="7fb7c5df-33d5-428f-bd5d-997520a4795b" data-toc-id="7fb7c5df-33d5-428f-bd5d-997520a4795b" dir="rtl">ویرایشگر نمایشی — تمام ویژگی‌ها  </h1><p dir="rtl">این سند تمام ویژگی‌ها را نشان می‌دهد: <strong>پررنگ</strong>، <em>کج</em>، <s>خط‌خورده</s>، <code>کد</code> درون خطی، و <a target="_blank" rel="noopener noreferrer" href="https://tiptap.dev">لینک</a>. تایپوگرافی: → و ….</p><p dir="rtl">فهرست مطالب با یک کلیک</p><ul dir="rtl"><li><p><a target="_self" rel="noopener noreferrer" href="#7fb7c5df-33d5-428f-bd5d-997520a4795b">ویرایشگر نمایشی — تمام ویژگی‌ها</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#d5d73dc7-f698-4831-b197-f6321542eb1c">نقل قول</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#c1504bde-2843-4b6b-af9f-de9aac984ed3">لیست‌ها</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#bf1ca4c8-82f2-4004-b850-a9da8ebb7100">بلاک کد</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#0d151764-0dbd-4bee-9323-e46381ba9b31">رسانه</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#9530c44b-cae9-425f-b234-b031f66656b3">جدول</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#c416531c-fc2c-428c-8641-e72ee86f2227">تراز و تغییر اندازه</a></p></li></ul><p><br></p><h2 id="d5d73dc7-f698-4831-b197-f6321542eb1c" data-toc-id="d5d73dc7-f698-4831-b197-f6321542eb1c" dir="rtl">نقل قول</h2><blockquote dir="rtl"><p>نقل قول برای تأکید. از آن برای برجسته کردن یک ایده کلیدی یا نقل قول استفاده کنید.</p></blockquote><p></p><p dir="rtl"><a target="_blank" rel="noopener noreferrer" href="https://localhost:12000">لینک: <strong>اینجا کلیک کنید</strong></a></p><h2 id="c1504bde-2843-4b6b-af9f-de9aac984ed3" data-toc-id="c1504bde-2843-4b6b-af9f-de9aac984ed3" dir="rtl">لیست‌ها</h2><ul dir="rtl"><li><p>نقطه اول</p></li><li><p>نقطه دوم</p></li></ul><ol dir="rtl"><li><p>مرحله اول</p></li><li><p>مرحله دوم</p></li></ol><h2 id="bf1ca4c8-82f2-4004-b850-a9da8ebb7100" data-toc-id="bf1ca4c8-82f2-4004-b850-a9da8ebb7100" dir="rtl">بلاک کد</h2><pre><code>function demo() {
  return "سلام ویرایشگر.";
}</code></pre><hr><h2 id="0d151764-0dbd-4bee-9323-e46381ba9b31" data-toc-id="0d151764-0dbd-4bee-9323-e46381ba9b31" dir="rtl">رسانه</h2><img src="/img-example.jpg" alt="تصویر مثال" width="448" height="254"><video class="rounded-md max-w-full h-auto" src="/video-example.mp4" controls="" preload="metadata" playsinline="" style="max-width: 100%; height: auto;"></video><audio controls="" preload="metadata" src="https://www.w3schools.com/html/horse.ogg"></audio><div data-youtube-video=""><iframe width="640" height="360" allowfullscreen="true" autoplay="false" disablekbcontrols="false" enableiframeapi="false" endtime="0" ivloadpolicy="0" loop="false" modestbranding="false" origin="" playlist="" rel="1" src="https://www.youtube.com/embed/Ukt2gVz25PQ?si=nnhGACnLotj4WugY" start="0"></iframe></div><h2 id="9530c44b-cae9-425f-b234-b031f66656b3" data-toc-id="9530c44b-cae9-425f-b234-b031f66656b3" dir="rtl">جدول</h2><div class="tableWrapper"><table style="min-width: 365px;"><colgroup><col style="width: 138px;"><col style="width: 202px;"><col style="min-width: 25px;"></colgroup><tbody><tr><th colspan="1" rowspan="1" colwidth="138"><p dir="rtl">سرصفحۀ الف</p></th><th colspan="1" rowspan="1" colwidth="202"><p dir="rtl">سرصفحۀ ب</p></th><th colspan="1" rowspan="1"><p dir="rtl">ساد</p></th></tr><tr><td colspan="1" rowspan="1" colwidth="138"><p dir="rtl">سلول ۱</p></td><td colspan="1" rowspan="1" colwidth="202"><p dir="rtl">سلول ۲ سادا</p></td><td colspan="1" rowspan="1"><p dir="rtl">سادسادسادسا</p></noscript></p></td></tr><tr><td colspan="1" rowspan="1" colwidth="138"><p dir="rtl">سلول</p></td><td colspan="1" rowspan="1" colwidth="202"><p dir="rtl">سلول ۴</p></td><td colspan="1" rowspan="1"><p dir="rtl">سادسا</p></p></td></tr></tbody>}</div><h2 id="c416531c-fc2c-428c-8641-e72ee86f2227" data-toc-id="c416531c-fc2c-428c-8641-e72ee86f2227" dir="rtl">تراز و تغییر اندازه</h2><p style="text-align: center;" dir="rtl">این پاراگراف در وسط قرار دارد.</p><p style="text-align: right;" dir="rtl">این پاراگراف به راست چین شده است.</p><hr><div data-type="asset-upload-node" data-media-type="image" accept="image/*" limit="1" maxsize="0"></div><div data-type="asset-upload-node" data-media-type="video" accept="image/*" limit="1" maxsize="0"></div><div data-type="asset-upload-node" data-media-type="audio" accept="image/*" limit="1" maxsize="0"></div><p></p>
`,
  ar: `
<h1 id="7fb7c5df-33d5-428f-bd5d-997520a4795b" data-toc-id="7fb7c5df-33d5-428f-bd5d-997520a4795b" dir="rtl">محرر تجريبي — جميع الميزات  </h1><p dir="rtl">توضح هذه الوثيقة كل ميزة: <strong>غامق</strong>، <em>مائل</em>، <s>يتوسطه خط</s>، <code>كود</code> مضمن، و<a target="_blank" rel="noopener noreferrer" href="https://tiptap.dev">رابط</a>. الطباعة: → و ….</p><p dir="rtl">جدول المحتويات بنقرة واحدة</p><ul dir="rtl"><li><p><a target="_self" rel="noopener noreferrer" href="#7fb7c5df-33d5-428f-bd5d-997520a4795b">محرر تجريبي — جميع الميزات</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#d5d73dc7-f698-4831-b197-f6321542eb1c">اقتباس</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#c1504bde-2843-4b6b-af9f-de9aac984ed3">قوائم</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#bf1ca4c8-82f2-4004-b850-a9da8ebb7100">كتلة الكود</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#0d151764-0dbd-4bee-9323-e46381ba9b31">وسائط</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#9530c44b-cae9-425f-b234-b031f66656b3">جدول</a></p></li><li><p><a target="_self" rel="noopener noreferrer" href="#c416531c-fc2c-428c-8641-e72ee86f2227">محاذاة وتغيير الحجم</a></p></li></ul><p><br></p><h2 id="d5d73dc7-f698-4831-b197-f6321542eb1c" data-toc-id="d5d73dc7-f698-4831-b197-f6321542eb1c" dir="rtl">اقتباس</h2><blockquote dir="rtl"><p>اقتباس للتأكيد. استخدمه لتسليط الضوء على فكرة رئيسية أو اقتباس.</p></blockquote><p></p><p dir="rtl"><a target="_blank" rel="noopener noreferrer" href="https://localhost:12000">رابط: <strong>انقر هنا</strong></a></p><h2 id="c1504bde-2843-4b6b-af9f-de9aac984ed3" data-toc-id="c1504bde-2843-4b6b-af9f-de9aac984ed3" dir="rtl">قوائم</h2><ul dir="rtl"><li><p>النقطة الأولى</p></li><li><p>النقطة الثانية</p></li></ul><ol dir="rtl"><li><p>الخطوة الأولى</p></li><li><p>الخطوة الثانية</p></li></ol><h2 id="bf1ca4c8-82f2-4004-b850-a9da8ebb7100" data-toc-id="bf1ca4c8-82f2-4004-b850-a9da8ebb7100" dir="rtl">كتلة الكود</h2><pre><code>function demo() {
  return "مرحبًا أيها المحرر.";
}</code></pre><hr><h2 id="0d151764-0dbd-4bee-9323-e46381ba9b31" data-toc-id="0d151764-0dbd-4bee-9323-e46381ba9b31" dir="rtl">وسائط</h2><img src="/img-example.jpg" alt="صورة توضيحية" width="448" height="254"><video class="rounded-md max-w-full h-auto" src="/video-example.mp4" controls="" preload="metadata" playsinline="" style="max-width: 100%; height: auto;"></video><audio controls="" preload="metadata" src="https://www.w3schools.com/html/horse.ogg"></audio><div data-youtube-video=""><iframe width="640" height="360" allowfullscreen="true" autoplay="false" disablekbcontrols="false" enableiframeapi="false" endtime="0" ivloadpolicy="0" loop="false" modestbranding="false" origin="" playlist="" rel="1" src="https://www.youtube.com/embed/Ukt2gVz25PQ?si=nnhGACnLotj4WugY" start="0"></iframe></div><h2 id="9530c44b-cae9-425f-b234-b031f66656b3" data-toc-id="9530c44b-cae9-425f-b234-b031f66656b3" dir="rtl">جدول</h2><div class="tableWrapper"><table style="min-width: 365px;"><colgroup><col style="width: 138px;"><col style="width: 202px;"><col style="min-width: 25px;"></colgroup><tbody><tr><th colspan="1" rowspan="1" colwidth="138"><p dir="rtl">رأس أ</p></th><th colspan="1" rowspan="1" colwidth="202"><p dir="rtl">رأس ب</p></th><th colspan="1" rowspan="1"><p dir="rtl">حزين</p></th></tr><tr><td colspan="1" rowspan="1" colwidth="138"><p dir="rtl">خلية 1</p></td><td colspan="1" rowspan="1" colwidth="202"><p dir="rtl">خلية 2 سادا</p></td><td colspan="1" rowspan="1"><p dir="rtl">سادسادسادسا</p></td></tr><tr><td colspan="1" rowspan="1" colwidth="138"><p dir="rtl">خلية</p></td><td colspan="1" rowspan="1" colwidth="202"><p dir="rtl">خلية 4</p></td><td colspan="1" rowspan="1"><p dir="rtl">سادسا</p></td></tr></tbody>}</div><h2 id="c416531c-fc2c-428c-8641-e72ee86f2227" data-toc-id="c416531c-fc2c-428c-8641-e72ee86f2227" dir="rtl">محاذاة وتغيير الحجم</h2><p style="text-align: center;" dir="rtl">هذه الفقرة في المنتصف.</p><p style="text-align: right;" dir="rtl">هذه الفقرة محاذاة لليمين.</p><hr><div data-type="asset-upload-node" data-media-type="image" accept="image/*" limit="1" maxsize="0"></div><div data-type="asset-upload-node" data-media-type="video" accept="image/*" limit="1" maxsize="0"></div><div data-type="asset-upload-node" data-media-type="audio" accept="image/*" limit="1" maxsize="0"></div><p></p>
`,
};

function TiptapEditorDemo({
  locale = "en",
}: {
  locale?: keyof typeof editorMessages;
}) {
  const [content, setContent] = useState(htmlContent[locale]);
  const [displayMode, setDisplayMode] = useState<
    "editor" | "preview-html-output"
  >("editor");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const message = `UN EXPECTED FORM SUBMISSION! TIPTAP EDITOR SUBMITTED THE WRAPPER FORM! THIS IS A BUG!`;
        // eslint-disable-next-line no-console
        console.error(message);
        toast.error(message);
      }}
      className="space-y-6"
    >
      <Badge variant="warning" className="mx-auto mb-8 block px-3 py-2 text-lg">
        Editor BETA
      </Badge>

      <Badge variant="info" className="mx-auto block px-3 py-2 text-base">
        Changing the locale {"doesn't"} update the direction, You should handle
        the direction change
      </Badge>

      <div className="relative isolate">
        <Button
          type="button"
          onClick={() =>
            setDisplayMode((m) =>
              m === "editor" ? "preview-html-output" : "editor",
            )
          }
          variant="outline"
          data-display-mode={displayMode}
          className="absolute inset-e-5 top-15 z-50 shrink-0 transition-normal duration-200 data-[display-mode=content]:top-5"
        >
          {displayMode === "editor" ? "preview html output" : "back to editor"}
        </Button>
        {displayMode === "editor" ? (
          <TiptapEditorDynamic
            content={content}
            locale={locale}
            onUpdate={({ editor }) => setContent(editor.getHTML())}
          />
        ) : (
          <div className="mx-auto max-w-7xl overflow-y-auto overscroll-contain rounded-md border p-10">
            <TiptapContentRenderer
              htmlContent={content}
              className="mx-auto h-200 w-full max-w-2xl px-2 py-8"
            />
          </div>
        )}
      </div>
    </form>
  );
}

export { TiptapEditorDemo };
