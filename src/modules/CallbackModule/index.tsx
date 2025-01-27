'use client';

import { useAuthContext } from '@/components/context';
import { useToast } from '@/hooks/use-toast';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export const CallbackModule: React.FC<{ code?: string }> = ({ code }) => {
  const { setIsAuthenticated } = useAuthContext();
  const { toast } = useToast();
  const router = useRouter();

  const callback = async () => {
    if (!code) {
      toast({
        title: 'Code not provided!',
        variant: 'destructive',
      });
      router.push('/');
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/callback/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        },
      );

      const responseJson = await response.json();

      if (responseJson.status !== 200) {
        throw new Error(responseJson.errors);
      }
      setIsAuthenticated(true);
      setCookie('AT', responseJson.contents.access_token);
    } catch (err: any) {
      toast({
        title: 'Login error!',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      router.push('/');
    }
  };

  useEffect(() => {
    callback();
  }, []);

  return <></>;
};
