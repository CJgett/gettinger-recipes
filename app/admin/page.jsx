'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import '../styles/admin.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    setIsLoading(isLoading => true);
    e.preventDefault();
    setError('');
    
    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });
    
    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/recipes');
      router.refresh();
    }

    setIsLoading(isLoading => false);
  };

  return (
    <section className="admin-login">
      <h2>Admin Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" disabled={isLoading}>{isLoading ? "Logging in" : "Login"}</button>
      </form>
    </section>
  );
}
