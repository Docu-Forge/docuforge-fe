'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Schema validasi menggunakan Zod
const registerSchema = z.object({
  username: z.string().nonempty('Username wajib diisi'),
  email: z.string().email('Email tidak valid').nonempty('Email wajib diisi'),
  password: z
    .string()
    .min(6, 'Password minimal 6 karakter')
    .nonempty('Password wajib diisi'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterModule: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  // Menggunakan useForm dengan schema Zod
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register/`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(data),
        },
      );
      const responseJson = await response.json();
      if (responseJson.status !== 200) throw new Error(responseJson.message);
      toast({
        title: 'Registration Successful!',
        description: 'Please login to your account.',
        variant: 'success',
      });
      router.push('/login');
    } catch (err: any) {
      toast({
        title: 'Registration Failed!',
        description: err.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <div className="flex container mx-auto max-w-screen-md min-h-screen items-start pt-20">
        <div className="py-10 px-6 sm:px-10 w-full">
          <h1 className="text-lg  md:text-xl lg:text-3xl font-semibold mb-6 md:mb-10 text-center">
            Register Account
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              {/* Username Field */}
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
              {/* Email Field */}
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-[#F3F7F9]"
                        type="email"
                        placeholder="Email"
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
                Register
              </Button>
            </form>
          </Form>
          {/* Don't Have an Account Link */}
          <p className="mt-8 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="font-medium hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
