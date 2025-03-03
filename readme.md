# 🔗 Encurtador de URLs Simples com Cloudflare Workers ⚙️

Este Cloudflare Worker implementa um encurtador de URLs básico, permitindo criar URLs curtas personalizadas e redirecionar para a URL original. Usa o Cloudflare Workers KV para armazenamento das URLs.

## ✨ Funcionalidades

*   **Redirecionamento:**
    *   URLs no formato `/go/:id` são redirecionadas (código 301) para a URL longa armazenada, se existir.
    *   Retorna um erro 404 se a URL curta não for encontrada.
*   **Criação de URLs Curtas:**
    *   Usa requisições POST para criar novas URLs curtas.
    *   Requer um token de acesso (`env.ACESSO`) para autorização.
    *   Retorna um erro 403 se o token estiver incorreto.
    *   Retorna um erro 400 se os parâmetros `short` ou `long` estiverem faltando.
    *   Retorna um erro 201 (Created) com uma mensagem de sucesso se a criação for bem-sucedida.
*   **Validação:**
    *   Verifica se o token de acesso fornecido é válido.
    *   Verifica se os parâmetros `short` e `long` estão presentes na requisição POST.
*   **Mensagens de Erro:**
    *   Retorna mensagens de erro informativas para diferentes situações (URL não encontrada, acesso negado, parâmetros inválidos, erro ao processar a requisição).
*   **KV Storage:** Utiliza Cloudflare Workers KV para persistir as URLs encurtadas.

## 🛠️ Tecnologias Utilizadas

*   **Cloudflare Workers:** Plataforma serverless para executar código na borda da rede Cloudflare.
*   **Cloudflare Workers KV:** Banco de dados chave-valor distribuído para armazenamento persistente.
*   **JavaScript:** Linguagem de programação.
*   **URL API:** Usada para manipular URLs.
*   **Fetch API:** Para manipular as requisições (POST e GET).