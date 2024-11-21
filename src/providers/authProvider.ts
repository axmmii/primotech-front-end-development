import type { AuthProvider } from "@refinedev/core";

export const TOKEN_KEY = "refine-auth";

// const API_URL = "http://127.0.0.1:3000/auth";
// const API_URL = "http://192.168.1.51:3000/auth";
const API_URL = import.meta.env.VITE_API_AUTH_URL;
export const authProvider: AuthProvider = {
  
  login: async ({ username, email, password }) => {
    console.log('login',email);

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password}),
     
    });
  
    if (response.status == 201 ){
      
    const accessToken = await response.json();
    localStorage.setItem(TOKEN_KEY, accessToken.token);
    localStorage.setItem('IDENTITY', accessToken.user);

    console.log('login', accessToken);
    
      return {
        success: true,
        redirectTo: "/",
      };
    }else{
    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
    }
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      //console.log('authenticated',token);
      
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const identity = localStorage.getItem('IDENTITY');
    if (identity) {
      return {
        id: 1,
        name: identity,
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
