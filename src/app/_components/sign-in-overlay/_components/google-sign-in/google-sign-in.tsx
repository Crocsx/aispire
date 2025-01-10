'use client';

import { useState, useEffect, useCallback } from 'react';

import { LoadingOverlay } from '@mantine/core';
import Script from 'next/script';

import { createClient } from '~aispire/external/supabase';

declare global {
  interface Window {
    handleSignInWithGoogle?: (response: {
      credential: string;
      select_by: string;
      state: string;
    }) => Promise<void>;
  }
}

export const GoogleSignIn = () => {
  const [hashedNonce, setHashedNonce] = useState<string>('');
  const [nonce, setNonce] = useState<string>('');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // https://supabase.com/docs/guides/auth/social-login/auth-google#google-pre-built
    const generateNonce = async () => {
      const newNonce = btoa(
        String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32)))
      );
      setNonce(newNonce);

      const encoder = new TextEncoder();
      const encodedNonce = encoder.encode(newNonce);
      const hashBuffer = await crypto.subtle.digest('SHA-256', encodedNonce);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashedValue = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      setHashedNonce(hashedValue);
    };

    generateNonce();
  }, []);

  const handleSignInWithGoogle = useCallback(
    async (response: {
      credential: string;
      select_by: string;
      state: string;
    }) => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: response.credential,
          nonce,
        });

        if (error) {
          console.error('Sign in error:', error);
          throw error;
        }

        // Handle successful sign in
        console.log('Signed in successfully:', data);
      } catch (err) {
        console.error('Failed to sign in:', err);
      }
    },
    [nonce]
  );

  useEffect(() => {
    if (!nonce || !hashedNonce) return;
    window.handleSignInWithGoogle = handleSignInWithGoogle;
    setIsReady(true);

    return () => {
      delete window.handleSignInWithGoogle;
      setIsReady(false);
    };
  }, [nonce, hashedNonce, handleSignInWithGoogle]);

  if (!isReady) {
    return <LoadingOverlay visible />;
  }

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" />
      <div
        id="g_id_onload"
        data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleSignInWithGoogle"
        data-auto_select="true"
        data-itp_support="true"
        data-nonce={hashedNonce}
      />
      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      />
    </>
  );
};
