export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/go/")) {
      const key = url.pathname.replace("/go/", "");
      const longURL = await env.URLs.get(key);
      if (longURL) {
        return Response.redirect(longURL, 302, {
          headers: {
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
          },
        });
      }
      return new Response("URL não encontrada", { status: 404 });
    }

    if (request.method === "POST") {
      try {
        const { metodo, short, long, token } = await request.json();

        if (token !== env.ACESSO) {
          return new Response("Acesso negado", { status: 403 });
        }

        if (!metodo || !short || !long) {
          return new Response("Parâmetros inválidos", { status: 400 });
        }

        if (!["adicao", "edicao", "exclusao"].includes(metodo)) {
          return new Response("Método inválido. Use 'adicao', 'edicao' ou 'exclusao'.", { status: 400 });
        }

        if (metodo === "adicao") {
          await env.URLs.put(short, long);
          return new Response(`https://url.class-one.com.br/go/${short}`, { status: 201 });
        } else if (metodo === "edicao") {
          const existingURL = await env.URLs.get(short);
          if (!existingURL) {
            return new Response(`URL encurtada /go/${short} não encontrada para edição.`, { status: 404 });
          }
          await env.URLs.put(short, long);
          return new Response(`https://url.class-one.com.br/go/${short}`, { status: 200 });
        } else if (metodo === "exclusao") {
          const existingURL = await env.URLs.get(short);
          if (!existingURL) {
            return new Response(`URL encurtada /go/${short} não encontrada para exclusão.`, { status: 404 });
          }
          await env.URLs.delete(short);
          return new Response(`URL encurtada /go/${short} excluída com sucesso.`, { status: 200 });
        }


      } catch (error) {
        return new Response(error.message, { status: 400 });
      }
    }

    return new Response("Use POST para criar, editar ou excluir URLs ou /go/:id para acessar", { status: 400 });
  }
};