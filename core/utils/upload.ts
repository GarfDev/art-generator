/* eslint-disable @typescript-eslint/no-explicit-any */

import FormData from 'form-data'

export const upload = async (base64: string): Promise<string> => {
  const formData = new FormData()
  formData.append('image', base64.replace('data:image/png;base64,', ''))
  formData.append('type', 'base64')

  const res = await fetch('https://api.imgur.com/3/image/', {
    method: 'post',
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
    },
    body: formData as any,
  })
  const resData = await res.json()

  return resData.data.link
}
