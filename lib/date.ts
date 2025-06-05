import { format, parseISO } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export function formatDate(dateString: string) {
  const date = parseISO(dateString)
  return format(date, 'yyyy年MM月dd日', { locale: zhCN })
}

export function formatDateShort(dateString: string) {
  const date = parseISO(dateString)
  return format(date, 'MM-dd', { locale: zhCN })
} 