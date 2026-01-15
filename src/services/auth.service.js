import api from "./axios";

const logError = (label, error) => {
  console.group(`❌ ${label}`)
  console.error('message:', error.message)
  console.error('status:', error.response?.status)
  console.error('data:', error.response?.data)
  console.error('headers:', error.response?.headers)
  console.error('config:', error.config)
  console.groupEnd()
}

const authService = {
  async register(data) {
    // console.log('➡️ REGISTER REQUEST:', data)
    try {
      const res = await api.post("/api/auth/register/", data)
      // console.log('✅ REGISTER RESPONSE:', res.data)
      return res
    } catch (err) {
      logError('REGISTER FAILED', err)
      throw err
    }
  },

  async login(data) {
    // console.log('➡️ LOGIN REQUEST:', data)
    try {
      const res = await api.post("/api/auth/login/", data)
      // console.log('✅ LOGIN RESPONSE:', res.data)
      return res
    } catch (err) {
      logError('LOGIN FAILED', err)
      throw err
    }
  },

  async getMe() {
    // console.log('➡️ GET ME')
    try {
      const res = await api.get("/api/auth/me/")
      // console.log('✅ ME RESPONSE:', res.data)
      return res
    } catch (err) {
      logError('GET ME FAILED', err)
      throw err
    }
  },

  async updateProfile(data) {
    // console.log('➡️ UPDATE PROFILE:', data)
    try {
      const res = await api.patch("/api/auth/me/profile/", data)
      // console.log('✅ UPDATE PROFILE RESPONSE:', res.data)
      return res
    } catch (err) {
      logError('UPDATE PROFILE FAILED', err)
      throw err
    }
  },

  async uploadAvatar(formData) {
    // console.log('➡️ UPLOAD AVATAR')
    try {
      const res = await api.patch("/api/auth/me/avatar/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      // console.log('✅ UPLOAD AVATAR RESPONSE:', res.data)
      return res
    } catch (err) {
      logError('UPLOAD AVATAR FAILED', err)
      throw err
    }
  },
}

export default authService
