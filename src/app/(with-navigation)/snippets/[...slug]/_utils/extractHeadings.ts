type Heading = { depth: number; title: string; id: string };

export function extractHeadings(markdown: string, maxDepth = 6): Heading[] {
  const lines = markdown.split(/\r?\n/);
  const headings: Heading[] = [];

  for (const line of lines) {
    const match = line.match(/^\s*(#{1,6})\s+(.+?)\s*$/);
    if (!match) continue;

    const depth = match?.[1]?.length || 0;
    if (depth > maxDepth) continue;

    const title = match?.[2]?.trim();
    if (!title) continue;

    const id = title.toLowerCase().replaceAll(" ", "-");

    headings.push({ depth, title, id });
  }

  return headings;
}
