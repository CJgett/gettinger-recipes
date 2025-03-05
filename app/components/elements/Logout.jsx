import { signOut, useSession } from 'next-auth/react';
import '../../styles/logout.css';

export default function LogoutButton() {

    // this syntax is from the next-auth documentation. 
    // you can get other info such as status or update, too!
    const { data: session } = useSession();
    const isAdmin = session?.user?.role === 'admin';

    return (
        <button
        onClick={async() => await signOut({callbackUrl: '/'})}
        className={`logout-button ${isAdmin ? "show" : ''}`}
        >
        Logout
        </button>
    );
}