'use server';

import { cookies } from 'next/headers';

export async function loginAction(_prevState: unknown, formData: FormData) {
  const userid = formData.get('userid') as string;
  const password = formData.get('password') as string;

  if (!userid || !password) {
    return { error: 'User ID and Password are required' };
  }

  try {
    // Call our FastAPI Backend instead of Staff API directly
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://backend:8000';
    const response = await fetch(`${backendUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userid, password }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { error: errorData.message || 'Authentication failed' };
    }

    const data = await response.json();

    // Store user session in a cookie (Next.js 15 cookies API is async)
    const cookieStore = await cookies();
    cookieStore.set('session', JSON.stringify(data), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    });

    return { success: true, user: data };
  } catch (error) {
    console.error('Auth Error:', error);
    return { error: 'An unexpected error occurred during login' };
  }
}
