# 🌐 Encurtador de URLs Avançado com Cloudflare Workers KV 🚀

Este Cloudflare Worker implementa um encurtador de URLs completo com funcionalidades de criação, edição e exclusão de URLs curtas. Ele utiliza o Cloudflare Workers KV para armazenamento persistente e oferece uma API para gerenciamento.

## ✨ Funcionalidades

*   **Redirecionamento (GET):**
    *   URLs no formato `/go/:id` são redirecionadas (código 301) para a URL longa correspondente.
    *   Define cabeçalhos `Cache-Control`, `Pragma` e `Expires` para evitar o cache do redirecionamento.
    *   Retorna um erro 404 se a URL curta não for encontrada.
*   **Gerenciamento de URLs (POST):**
    *   Usa requisições POST para adicionar, editar ou excluir URLs.
    *   Requer um token de acesso (`env.ACESSO`) para autorização.
    *   Parâmetro `metodo`: Especifica a operação a ser realizada (`"adicao"`, `"edicao"`, `"exclusao"`).
    *   Retorna erros apropriados para:
        *   Acesso negado (token incorreto).
        *   Parâmetros inválidos (faltando `metodo`, `short` ou `long`).
        *   Método inválido.
        *   URL curta não encontrada (para edição e exclusão).
*   **Validação Robusta:**
    *   Verifica o token de acesso.
    *   Verifica a presença dos parâmetros obrigatórios (`metodo`, `short`, `long`).
    *   Valida o valor do parâmetro `metodo`.
    *   Verifica se a URL a ser editada ou excluída existe.
*   **Mensagens de Erro:**
    *   Retorna mensagens de erro descritivas e informativas para cada cenário.
*   **KV Storage:** Utiliza Cloudflare Workers KV para armazenar as URLs encurtadas de forma persistente.

## 🛠️ Tecnologias Utilizadas

*   **Cloudflare Workers:** Plataforma serverless.
*   **Cloudflare Workers KV:** Banco de dados chave-valor.
*   **JavaScript:** Linguagem de programação.
*   **URL API:** Manipulação de URLs.
*   **Fetch API:** Manipulação das requisições.
*   **HTTP Status Codes:** Uso correto de códigos de status HTTP para indicar o resultado das operações.
* **Cache Control**: O redirecionamento possui um controle de cache para evitar problemas.