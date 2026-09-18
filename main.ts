Deno.serve(async (req: Request) => {
  const url = new URL(req.url);
  const key = url.searchParams.get('key');

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Auth-Token, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Preflight request handle karo
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Agar key nahi hai
  if (!key) {
    return new Response(JSON.stringify({ status: 'not_verified' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    // PythonAnywhere ko request bhejo
    const target = `https://Pc2logo.pythonanywhere.com/key-verify?key=${encodeURIComponent(key)}`;
    const response = await fetch(target, {
      method: 'GET',
      headers: {
        'X-Auth-Token': 'NAIM_SECURE_TOKEN_2024',
        'Accept': 'application/json',
      },
    });

    const data = await response.text();

    // CORS headers ke saath wapas bhejo
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ status: 'error', message: String(err) }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});
