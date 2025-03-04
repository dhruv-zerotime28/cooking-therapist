import { NextRequest } from "next/server";


export async function GET(request: NextRequest,
    { params }: { params: Promise<{ id: string }> }){
    
    return new Response(JSON.stringify({ }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

