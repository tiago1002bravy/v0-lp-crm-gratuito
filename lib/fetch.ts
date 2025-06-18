export interface SendDataToLeadsApi{
    email: string;
    phone: string;
    name: string;
}

/**
 * @name Presente para Tiago Teles
 * @description Tiago, esse código é um presente do seu irmão! 
 * Aqui está uma função que envia dados para a API de leads.
 * Espero que goste! 😊 Ps.: Passa o mouse em cima da função para ler sobre ela rsrs
 * 
 * @param {string} origin - A origem do webhook (ex: 'landing-page', 'form')
 * @param {SendDataToLeadsApi} data - Objeto contendo os dados do lead
 * @param {string} data.email - Email do lead
 * @param {string} data.phone - Telefone do lead
 * @param {string} data.name - Nome do lead
 * 
 * @returns {Promise<any>} Retorna a resposta da API em formato JSON
 * @throws {Error} Lança um erro se a requisição falhar
 * 
 * @example
 * ```typescript
 * await sendWebhookToLeadsApi('landing-page', {
 *   email: 'exemplo@email.com',
 *   phone: '11999999999',
 *   name: 'João Silva'
 * });
 * ```
 */
export const sendWebhookToLeadsApi = async (origin: string, data: SendDataToLeadsApi) => {

    if(!origin) return;

    const apiUrl = 'https://data.gestaointeligente.club/from/' + origin

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao enviar dados para a API:', error);
        throw error;
    }
}
