export default {
    async fetch(request, env) {
      const url = new URL(request.url);
  
      if (url.pathname.startsWith("/go/")) {
        const key = url.pathname.replace("/go/", "");
        const longURL = await env.URLs.get(key);
        if (longURL) {
          return Response.redirect(longURL, 301);
        }
        return new Response("URL não encontrada", { status: 404 });
      }
  
      if (request.method === "POST") {
        try {
          const { short, long, token } = await request.json();
          
          if (token !== env.ACESSO) {
            return new Response("Acesso negado", { status: 403 });
          }
  
          if (!short || !long) {
            return new Response("Parâmetros inválidos", { status: 400 });
          }
  
          await env.URLS.put(short, long);
          return new Response(`URL encurtada: /go/${short}`, { status: 201 });
        } catch (error) {
          return new Response("Erro ao processar a requisição", { status: 400 });
        }
      }
  
      return new Response("Use POST para criar ou /go/:id para acessar", { status: 400 });
    }
  };
  