import { DashboardModule } from '@/modules/DashboardModule';
import { User } from '@/types/User';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const token = getCookie('AT', { cookies });

  // Jika bukan superuser, redirect ke home  
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/userinfo`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const responseJson = await response.json();
  const user = responseJson.contents as User;
  console.log(responseJson);
  // if (!responseJson.contents.is_superuser) {
  //   redirect('/');
  // }

  return <DashboardModule user={user}/>;
}
