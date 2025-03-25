const API_URL = 'http://localhost:5000/api/v1';
export const authService = {
  signup: async (userData) => {    
    try {
      const response = await fetch(`${API_URL}/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      // Store user data in local storage
      localStorage.setItem('user', data.user);
      
      return data.user;
    } catch (error) {
      // Handle specific error scenarios
      if (error.response) {
        throw new Error(error.response.data.message || 'Signup failed');
      }
      throw new Error('Network error. Please try again.');
    }
  },

  login: async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      
      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return data.user;
    } catch (error) {
      // Handle specific error scenarios
      if (error.response) {
        throw new Error(error.response.data.message || 'Login failed');
      }
      throw new Error('Network error. Please try again.');
    }
  },

  logout: () => {
    // Remove user data from local storage
    localStorage.removeItem('user');
  }
};