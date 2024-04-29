import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:5500/token/refresh',
});

// Fungsi interceptor
const setupAxiosInterceptors = (logoutFunction) => {
  // Tambahkan penanganan untuk respons yang gagal
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      // Cek jika respons status adalah 401 (Unauthorized)
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        // Lakukan permintaan untuk memperbarui token
        const refreshToken = localStorage.getItem('refreshToken');

        try {
          const response = await axios.post('https://api.example.com/refresh', { refreshToken });
          const { ac } = response.data;

          // Simpan token baru di localStorage atau di tempat yang sesuai
          localStorage.setItem('accessToken', ac);

          // Perbarui header permintaan dengan token baru
          originalRequest.headers['Authorization'] = `Bearer ${ac}`;

          // Lakukan kembali permintaan yang gagal dengan token baru
          return api(originalRequest);
        } catch (refreshError) {
          // Jika permintaan pembaruan token gagal, logout pengguna
          logoutFunction(); // Implementasi logout sesuai kebutuhan aplikasi Anda
        }
      }

      // Jika respons bukan 401 atau gagal saat memperbarui token, lemparkan kembali error
      return Promise.reject(error);
    }
  );
};

export { api, setupAxiosInterceptors };
