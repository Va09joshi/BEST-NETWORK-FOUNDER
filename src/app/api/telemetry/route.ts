import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // In a real application, you might save this data to a database like Supabase
    // e.g. await supabase.from('telemetry').insert([data])

    // For now, we will just log it to demonstrate the backend is receiving the data
    console.log('--- Received Telemetry Data ---');
    console.log('Location:', data.location);
    console.log('Network:', data.network);
    
    // We can also extract the client's IP from the request headers
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('remote-addr') || 'Unknown IP';
    console.log('Client IP:', ip);
    console.log('-------------------------------');

    return NextResponse.json({ success: true, message: 'Telemetry received successfully' });
  } catch (error) {
    console.error('Error processing telemetry:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
