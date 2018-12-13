function getFormattedValue(value: string, language = 'en-US') {
  let formattedValue = parseFloat(value).toLocaleString(language, {
    maximumFractionDigits: 6,
    useGrouping: true,
  })

  // Add back missing .0 in e.g. 12.0
  const match = value.match(/\.\d*?(0*)$/)

  if (match) {
    formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0]
  }
  return formattedValue
}

export {getFormattedValue}
