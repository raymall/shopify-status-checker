import { minify } from 'html-minifier-terser'
import sanitizeHtml from 'sanitize-html'

export async function cleanHTML(html: string) {
  const minifyHTML = await minify(String(html), {
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    conservativeCollapse: false,
    continueOnParseError: true,
    decodeEntities: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeEmptyElements: true,
    removeOptionalTags: true,
    removeTagWhitespace: true,
  })

  const sanitiziedHTML = sanitizeHtml(minifyHTML, {
    allowedAttributes: {}
  })

  return sanitiziedHTML
}