import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { verifyToken } from './component-server-functions';

export default function withAdminAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin');
        return;
      }

      try {
        verifyToken(token);
      } catch (error) {
        console.error(error);
        localStorage.removeItem('adminToken');
        router.push('/admin');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
} 