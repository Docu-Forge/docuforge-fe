'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextInterface, AuthContextProviderProps } from './interface';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const AuthContext = createContext({} as AuthContextInterface);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSuperuser, setIsSuperuser] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<{ token: string; is_superuser: boolean }> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ username, password }),
      },
    );
    const responseJson = await response.json();
    if (responseJson.status !== 200) throw new Error(responseJson.errors);
    setCookie('token', responseJson.contents.token);
    setIsSuperuser(responseJson.contents.is_superuser);
    setIsAuthenticated(true);
    return responseJson.contents;
  };

  const getUser = async (token: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      const responseJson = await response.json();
      console.log(responseJson);

      if (responseJson.status !== 200) {
        throw new Error(responseJson.message);
      }
      setIsAuthenticated(true);
      setIsSuperuser(responseJson.contents.is_superuser);
    } catch (err: any) {
      toast({
        title: 'Please login again!',
        description: err.message,
        variant: 'destructive',
      });
      router.push('/login');
    }
  };

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      getUser(token);
    }
  }, []);

  const contextValue = {
    login,
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
