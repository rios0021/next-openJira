// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if(request.nextUrl.pathname.startsWith('/api/entries/')){
        const id = request.nextUrl.pathname.replace('/api/entries/', '');
        const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
        if (!checkMongoIDRegExp.test(id)){
            console.log('test')
            const url = new URL('/api/bad-request', request.url)
            url.search = `?message=${id} is not a valid Mongo ID`;
            return NextResponse.rewrite(url)
        }
    }
    
    return NextResponse.next();
    // return NextResponse.redirect(new URL('/about-2', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        // '/api/:path', 
        '/api/entries/:path*'
    ],
}