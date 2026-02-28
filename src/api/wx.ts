import request from '@/request'

export const getWxConfig = () => {
  return request.get('/api/wx/config', {
    params: {
      url: `${window.location.origin}${window.location.pathname}`,
    },
  })
}
