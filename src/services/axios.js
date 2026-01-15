import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/* ========= REQUEST ========= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log()
    }

    console.group('📤 API REQUEST')
    console.log('URL:', config.baseURL + config.url)
    console.log('METHOD:', config.method?.toUpperCase())
    console.log('HEADERS:', config.headers)
    console.log('DATA:', config.data)
    console.groupEnd()

    return config
  },
  (error) => {
    console.error('❌ REQUEST ERROR:', error)
    return Promise.reject(error)
  }
)

/* ========= RESPONSE ========= */
api.interceptors.response.use(
  (response) => {
    console.group('📥 API RESPONSE')
    console.log('URL:', response.config.url)
    console.log('STATUS:', response.status)
    console.log('DATA:', response.data)
    console.groupEnd()
    return response
  },
  (error) => {
    console.group('❌ API RESPONSE ERROR')
    console.error('URL:', error.config?.url)
    console.error('STATUS:', error.response?.status)
    console.error('DATA:', error.response?.data)
    console.error('HEADERS:', error.response?.headers)
    console.groupEnd()

    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      console.log('🔑 TOKEN FROM LS:', token)
      console.warn('⚠️ Unauthorized - token cleared')
    }

    return Promise.reject(error)
  }
)

export default api
