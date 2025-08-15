'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';
import { useWixClient } from '../hooks/useWixClient';

const CallbackPage = () => {
  const wixClient = useWixClient();
  const router = useRouter();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const storedData = localStorage.getItem('oAuthRedirectData');
        if (!storedData) throw new Error('Missing OAuth data');

        const oAuthData = JSON.parse(storedData);

        // Parse code and state from the URL
        const returnedOAuthData = wixClient.auth.parseFromUrl();
        if (returnedOAuthData.error) {
          alert(`Login error: ${returnedOAuthData.errorDescription}`);
          return;
        }

        // Exchange code + state for tokens
        const tokens = await wixClient.auth.getMemberTokens(
          returnedOAuthData.code,
          returnedOAuthData.state,
          oAuthData
        );

        // Set tokens on client
        wixClient.auth.setTokens(tokens);

        // Persist tokens in cookies (securely)
        Cookie.set('accessToken', JSON.stringify(tokens.accessToken), { secure: true });
        Cookie.set('refreshToken', JSON.stringify(tokens.refreshToken), { secure: true });

        // Optional: Clean up
        localStorage.removeItem('oAuthRedirectData');

        // Redirect to original page (or home)
        window.location.replace("/")
      } catch (error) {
        console.error('OAuth callback failed:', error);
        alert('Login failed. Please try again.');
        router.push('/'); // fallback
      }
    };

    handleOAuthCallback();
  }, [wixClient, router]);

  return (
    <div className="p-8 text-center">
      <h1 className="text-xl font-semibold">Completing Login...</h1>
    </div>
  );
};

export default CallbackPage;
