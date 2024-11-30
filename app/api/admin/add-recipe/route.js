import { NextResponse } from 'next/server';
import { handleUpload } from '@vercel/blob/client';

export async function POST(request) {
    console.log("Starting upload request");
    const body = await request.json();

    try {
        console.log("Token exists:", !!process.env.BLOB_READ_WRITE_TOKEN);
        
        const jsonResponse = await handleUpload({
            body,
            request,
            onBeforeGenerateToken: async (pathname) => {
                console.log("Generating token for path:", pathname);
                return {
                    allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
                };
            },
        });
        
        console.log("Upload successful:", jsonResponse);
        return NextResponse.json(jsonResponse);
    } catch (error) {
        console.error("Upload error in route:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        );
    }
}