'use client';

import Image from 'next/image';
import React from 'react';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

// Schema validasi menggunakan Zod
const loginSchema = z.object({
  username: z.string().nonempty('Username wajib diisi'),
  password: z.string().nonempty('Password wajib diisi'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginModule: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();

  // Menggunakan useForm dengan schema Zod
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(data),
        },
      );
      const responseJson = await response.json();
      if (responseJson.status !== 200) throw new Error(responseJson.errors);
      toast({
        title: 'Login Successful',
        description:
          'Welcome back! You have successfully logged into your account.',
        variant: 'success',
      });
      router.push('/');
    } catch (err: any) {
      toast({
        title: 'Login Failed',
        description: err.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <nav className="w-screen absolute h-16 p-2 flex justify-center bg-white drop-shadow-md">
        <div className="relative h-full aspect-square">
          <Image
            src={'/logo-no-background.png'}
            fill
            className="object-contain"
            alt="Logo"
          />
        </div>
      </nav>
      <div className="flex container mx-auto max-w-screen-lg min-h-screen items-start pt-20">
        <div className="w-1/2 hidden sm:flex items-center justify-center">
          <div className="relative w-full aspect-square">
            <Image
              src={'/login-vector.png'}
              fill
              className="object-contain"
              alt="Login"
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2 flex items-center justify-center">
          <div className="py-10 px-6 sm:px-10 w-full">
            <h1 className="text-lg  md:text-xl lg:text-3xl font-semibold mb-6 md:mb-10">
              Login to Your Account
            </h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                {/* Email Field */}
                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#F3F7F9]"
                          placeholder="Username"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Password Field */}
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormControl>
                        <Input
                          {...field}
                          className="bg-[#F3F7F9]"
                          type="password"
                          placeholder="Password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Submit Button */}
                <Button type="submit" className="w-full mt-6">
                  Login
                </Button>
              </form>
            </Form>
            {/* Don't Have an Account Link */}
            <p className="mt-8 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-medium hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
