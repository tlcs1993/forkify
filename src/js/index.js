import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

/* Estado global da aplicação.

    * - Objeto de busca 
    * - Objeto da receita atual
    * - Objeto da lista de compras
    * - Receitas curtidas

*/

// Objeto que recebe todo o resultado de uma busca.
const state = {};

// Função assíncrona que controla todas as etapas da busca pelos resultados.
const controlSearch = async () => {
    /* 1. Busca a 'query' a partir da 'view'. */
    const query = searchView.getInput();

    // Caso a 'query' exista...
    if (query) {
        // 2. Cria um novo objeto de busca e o adiciona ao objeto 'state'.
        state.search = new Search(query);

        // 3. Prepara a interface de usuário (UI) para os resultados.
        searchView.clearInput();
        searchView.clearResults();

        // 4. Procura por receitas.
        await state.search.getResults();

        // 5. Renderiza os resultados na interface de usuário (UI).
        searchView.renderResults(state.search.result);
    }
}

// Adiciona um 'event listener' no botão de 'submit'.
elements.searchForm.addEventListener('submit', (e) => {
    // Previne o comportamento padrão do elemento. Neste caso não vai permitir que a página recarregue para que a função a seguir possa ser executada.
    e.preventDefault();

    // Chama a função que cuida da busca pelos resultados.
    controlSearch();
});
