'use client';

import { useActionState } from 'react';
import { loginAction } from '@/lib/actions';

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="card w-96 bg-base-100 shadow-2xl border border-primary/10">
      <div className="card-body">
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="card-title text-2xl font-bold">Staff Login</h2>
          <p className="text-sm opacity-60">Enter your credentials to continue</p>
        </div>

        <form action={formAction} className="space-y-4">
          <div className="form-control w-full">
            <label className="label" htmlFor="userid">
              <span className="label-text font-semibold">User ID</span>
            </label>
            <input 
              id="userid"
              name="userid"
              type="text" 
              placeholder="Enter your ID" 
              className="input input-bordered w-full focus:input-primary transition-all" 
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label" htmlFor="password">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input 
              id="password"
              name="password"
              type="password" 
              placeholder="••••••••" 
              className="input input-bordered w-full focus:input-primary transition-all" 
              required
            />
          </div>

          {state?.error && (
            <div className="alert alert-error py-2 text-sm">
              <span>{state.error}</span>
            </div>
          )}

          {state?.success && (
            <div className="alert alert-success py-2 text-sm">
              <span>Login successful! Redirecting...</span>
            </div>
          )}

          <div className="card-actions mt-6">
            <button 
              type="submit" 
              className="btn btn-primary w-full text-lg"
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner"></span>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>

        <div className="divider opacity-20 my-6">OR</div>
        
        <div className="text-center text-xs opacity-50">
          For technical support, contact IT department <br />
          ext. 9999
        </div>
      </div>
    </div>
  );
}
