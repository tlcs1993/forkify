import Search from './../models/Search';

/* Estado global da aplicação.

    * - Objeto de busca 
    * - Objeto da receita atual
    * - Objeto da lista de compras
    * - Receitas curtidas

*/

const state = {};

const controlSearch = async () => {
    // FIXME: 1. Busca a 'query' a partir da 'view'.
    const query = 'pizza';

    // Caso a 'query' exista...
    if (query) {
        // 2. Cria um novo objeto de busca e o adiciona ao estado.
        state.search = new Search(query);

        // TODO: 3. Prepara a interface de usuário (UI) para os resultados.

        // 4. Procura por receitas.
        await state.search.getResults();

        // FIXME: 5. Renderiza os resultados na iterface de usuário (UI).
        console.log(state.search.result);
    }
}

document.querySelector('.search').addEventListener('submit', (e) => {
    e.preventDefault();

});

const search = new Search('pizza');
console.log(search);
search.getResults();
