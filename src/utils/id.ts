import { nanoid } from 'nanoid'

/**
 * 生成一个短唯一 ID。
 *
 * @param size ID 长度（默认 12）
 */
export function createId(size: number = 12): string {
  return nanoid(size)
}

