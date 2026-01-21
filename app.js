// api/log.js
// Este é o código da sua função serverless que a Vercel vai executar.

module.exports = async (req, res) => {
  // A Vercel automaticamente analisa o body de requisições JSON e o disponibiliza em req.body.

  // Verifica se a requisição é do tipo POST
  if (req.method === 'POST') {
    const body = req.body;

    // --- AÇÃO PRINCIPAL: SALVAR O LOG ---
    // Para um setup simples na Vercel, o console.log é a forma mais fácil de "salvar" um log.
    // A Vercel captura toda a saída do console.log e a exibe nos logs da sua função.
    console.log('🚨 Novo Log Recebido:', JSON.stringify(body, null, 2));

    // Você pode adicionar um timestamp ou outras informações ao log se desejar
    const logEntry = {
      timestamp: new Date().toISOString(),
      receivedBody: body,
      headers: req.headers // Útil para depuração
    };
    console.log('Detalhes do Log:', JSON.stringify(logEntry, null, 2));
    // --- FIM DA AÇÃO PRINCIPAL ---

    // Responde ao cliente que o log foi recebido com sucesso
    res.status(200).json({
      message: 'Log recebido e registrado com sucesso!',
      receivedAt: new Date().toISOString(),
      // Para fins de demonstração, podemos ecoar o body recebido,
      // mas em um cenário real, você pode não querer fazer isso por segurança.
      echoedBody: body
    });

  } else {
    // Se o método não for POST, retorna um erro 405 (Method Not Allowed)
    res.status(405).json({
      message: 'Método não permitido. Use apenas requisições POST para este endpoint.',
      method: req.method
    });
  }
};
