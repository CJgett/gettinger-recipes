import Link from 'next/link'

export default async function NotFound() {
    return (
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2>404 - Page Not Found</h2>
            <p>The page you are looking for does not exist. Sorry bout that.</p>
        </div>
    )
}