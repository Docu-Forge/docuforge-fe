import { ChatbotModule } from '@/modules/ChatbotModule';
import { User } from '@/types/User';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export default async function ChatBot() {
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
    if (!responseJson.contents) {
        redirect('/');
    }
    return <ChatbotModule user={user}/>;
}