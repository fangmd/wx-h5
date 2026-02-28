export * from './sp'
export * from './id'

/**
 * 从 Markdown 文本中提取 HTML 代码块内容
 * @param markdownText Markdown 格式的文本
 * @returns 提取的 HTML 内容，如果没有找到则返回空字符串
 *
 * @example
 * const markdown = "```html\n<!DOCTYPE html>...</html>\n```"
 * const html = extractHtmlFromMarkdown(markdown)
 * // 返回: "<!DOCTYPE html>...</html>"
 */
export function extractHtmlFromMarkdown(markdownText: string): string {
  if (!markdownText || typeof markdownText !== 'string') {
    return ''
  }

  if (markdownText.startsWith('<!DOCTYPE html>')) {
    return markdownText
  }

  // 匹配 markdown 代码块，支持多种格式：
  // 1. ```html\n...\n```
  // 2. ```\n<!DOCTYPE html>...\n```
  // 3. ```html...```（没有换行的情况）
  const codeBlockPattern = /```(?:html)?\n?([\s\S]*?)```/g

  let match: RegExpExecArray | null
  const htmlContents: string[] = []

  // 查找所有匹配的代码块
  while ((match = codeBlockPattern.exec(markdownText)) !== null) {
    const content = match[1].trim()

    // 检查是否是 HTML 内容
    // 如果代码块标记为 html，或者内容以 <!DOCTYPE html> 或 <html 开头
    if (
      match[0].includes('```html') ||
      content.includes('<!DOCTYPE html') ||
      content.includes('<html') ||
      (content.startsWith('<') && content.includes('</'))
    ) {
      htmlContents.push(content)
    }
  }

  // 如果找到多个 HTML 代码块，返回第一个
  // 也可以根据需要返回所有或者最后一个
  return htmlContents.length > 0 ? htmlContents[0] : ''
}
