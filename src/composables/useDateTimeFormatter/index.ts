import { format, formatDistanceToNow } from 'date-fns'
import { sr } from 'date-fns/locale'

export const useDefaultDateFormatter = (rawDateTime: string): string => {
  return format(new Date(rawDateTime), 'dd/MM/yyyy')
}

export const useDefaultTimeFormatter = (rawDateTime: string | Date): string => {
  switch(typeof rawDateTime) {
    case 'string':
      return format(new Date(rawDateTime), 'HH:mm')
    case 'object': 
      if (rawDateTime instanceof Date) {
        return `${rawDateTime.getHours().toString().padStart(2, '0')}:${rawDateTime.getMinutes().toString().padStart(2, '0')}`
      }    
  }

  return ''
}

export const useTimeOnlyToDefaultTimeFormatter = (
  timeOnly: string | null,
  useSeconds = false
): string | null => {
  if (timeOnly == null || timeOnly == '') {
    return null
  } else {
    const date = new Date()

    // Extract the time portion from the time-only string and set it in the JavaScript Date object
    const timeParts = timeOnly.split(':')
    date.setHours(parseInt(timeParts[0], 10))
    date.setMinutes(parseInt(timeParts[1], 10))

    const time = format(date, 'HH:mm')

    return useSeconds ? time.concat(':00') : time
  }
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
  сати: 'sati',
  сата: 'sata',
  сат: 'sat',
  дан: 'dan',
  дана: 'dana',
  недеља: 'nedelja',
  недеље: 'nedelje',
  месец: 'mesec',
  месеци: 'meseci',
  година: 'godina',
  године: 'godine'
}

export const getTomorowDate = () => {
  const tomorowDate = new Date()
  tomorowDate.setDate(tomorowDate.getDate() + 1)
  return tomorowDate
}
