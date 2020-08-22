export const getUrlFile = (urlDrive, format) => {
  try {
    const url = new URL(urlDrive)
    const id = url.searchParams.get('id')
    if (format === 'embed') {
      return getUrlEmbed(id)
    } else {
      return toLinkDrive(id, format)
    }
  } catch (err) {
    return null
  }
}

export const toLinkDrive = (id, format) => {
  return `https://drive.google.com/${format || 'uc'}?id=${id || ''}`
  // &sz=w${width || 200}-h${height || 200}
}

export const getUrlEmbed = (id) => {
  return `https://drive.google.com/file/d/${id}/preview`
}

export const paginate = (array, index, size) => {
  // transform values
  index = Math.abs(parseInt(index))
  index = index > 0 ? index - 1 : index
  size = parseInt(size)
  size = size < 1 ? 1 : size

  // filter
  return [...(array.filter((value, n) => {
    return (n >= (index * size)) && (n < ((index + 1) * size))
  }))]
}
