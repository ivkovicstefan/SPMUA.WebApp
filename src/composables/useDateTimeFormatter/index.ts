import { format, formatDistanceToNow } from 'date-fns'
import { sr } from 'date-fns/locale'

export const useDefaultDateFormatter = (rawDateTime: string): string => {
  return format(new Date(rawDateTime), 'dd/MM/yyyy')
}

export const useDefaultTimeFormatter = (rawDateTime: string): string => {
  return format(new Date(rawDateTime), 'HH:mm')
}

export const useDateTimeAgoFormatter = (rawDateTime: string): string => {
  // Calculate the time difference in words using Serbian locale
  const formattedDate = formatDistanceToNow(new Date(rawDateTime), { addSuffix: true, locale: sr })

  // Replace Cyrillic with Latin script
  let formattedDateLatin = formattedDate
  for (const cyrillicWord in latinScriptMap) {
    const latinScript = latinScriptMap[cyrillicWord]
    formattedDateLatin = formattedDateLatin.replace(new RegExp(cyrillicWord, 'g'), latinScript)
  }

  // Remove word 'oko' from the result
  formattedDateLatin = formattedDateLatin.replace('oko ', '')

  return formattedDateLatin
}

const latinScriptMap: any = {
  пре: 'pre',
  око: 'oko',
  секунда: 'sekunda',
  секунде: 'sekunde',
  минут: 'minut',
  минута: 'minuta',
  сат: 'sat',
  сата: 'sata',
  дан: 'dan',
  дана: 'dana',
  недеља: 'nedelja',
  недеље: 'nedelje',
  месец: 'mesec',
  месеци: 'meseci',
  година: 'godina',
  године: 'godine'
}
