'use client';

import { getCookie } from 'cookies-next';
import React, { useState, useEffect } from 'react';

interface UserInfo {
  name: string;
  email: string;
  given_name: string;
  family_name: string;
  accounts: { account_id: string; account_name: string; is_default: boolean }[];
}

export const ProfileModule: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/userinfo`,
          {
            headers: {
              Authorization: `Bearer ${getCookie('AT')}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        const data = await response.json();
        setUserInfo(data.contents);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-screen-lg">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      {userInfo && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Personal Information</h2>
            <p>
              <span className="font-semibold">Name:</span> {userInfo.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {userInfo.email}
            </p>
            <p>
              <span className="font-semibold">Given Name:</span>{' '}
              {userInfo.given_name}
            </p>
            <p>
              <span className="font-semibold">Family Name:</span>{' '}
              {userInfo.family_name}
            </p>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">Accounts</h2>
            {userInfo.accounts.map((account, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-md mb-2 border border-gray-300"
              >
                <p>
                  <span className="font-semibold">Account Name:</span>{' '}
                  {account.account_name}
                </p>
                <p>
                  <span className="font-semibold">Account ID:</span>{' '}
                  {account.account_id}
                </p>
                <p>
                  <span className="font-semibold">Default:</span>{' '}
                  {account.is_default ? 'Yes' : 'No'}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => alert('Feature not implemented yet')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};
