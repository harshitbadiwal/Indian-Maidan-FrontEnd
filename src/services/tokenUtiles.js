/**
 * Extracts and returns only the formattedUser object from JWT token
 * @returns {object|null} Formatted user data or null if invalid/expired
 */
export function getTokenData() {
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    try {
      // 1. Split and validate token structure
      const parts = token.split('.');
      if (parts.length !== 3) {
        console.error('Invalid token format');
        return null;
      }
  
      // 2. Decode payload
      const payload = JSON.parse(atob(parts[1]
        .replace(/-/g, '+')
        .replace(/_/g, '/')
        .padEnd(parts[1].length + (4 - (parts[1].length % 4)) % 4, '=')
      ));
  
      // 3. Check expiration
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        console.warn('Token expired');
        return null;
      }
  
      // 4. Extract and return only the formattedUser object
      return payload?.formattedUser ? {
        id: payload?.id || payload?.user?.id,
        ...payload?.formattedUser
      } : null;
  
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }