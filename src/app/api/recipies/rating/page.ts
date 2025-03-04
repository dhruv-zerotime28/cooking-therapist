import { NextRequest } from "next/server";

export async function POST(request: NextRequest,
    { params }: { params: Promise<{ id: string }> }){
    
    return new Response(JSON.stringify({ }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
