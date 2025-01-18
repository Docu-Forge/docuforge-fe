import { DashboardModule } from '@/modules/DashboardModule';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const token = getCookie('token', { cookies });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );
  const responseJson = await response.json();

  // Jika bukan superuser, redirect ke home
  if (!responseJson.contents.is_superuser) {
    redirect('/');
  }

  return <DashboardModule />;
}
