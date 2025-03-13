import { NextRequest } from "next/server";


export async function GET(request: NextRequest){
    //here get all in case of no body is there , get filtered on the basis of queries from search,tags,categories
    return new Response(JSON.stringify({ }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

