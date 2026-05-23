export const login = async (username, password) => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 800));

  if (username === 'admin' && password === 'admin123') {
    const mockUser = {
      _id: 'mock_admin_id_999',
      username: 'admin',
      token: 'simulated_jwt_token_akash_k_portfolio_serverless'
    };
    localStorage.setItem('userInfo', JSON.stringify(mockUser));
    return mockUser;
  } else {
    const error = new Error('Invalid administration credentials.');
    error.response = { data: { message: 'Invalid administration username or password' } };
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('userInfo');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('userInfo');
  return user ? JSON.parse(user) : null;
};
