import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/* Estado global da aplicação.

    * - Objeto de busca 
    * - Objeto da receita atual
    * - Objeto da lista de compras
    * - Receitas curtidas

*/

/***** CONTROLADOR DE BUSCAS *****/

// Objeto que recebe todo o resultado de uma busca.
const state = {};

// Função assíncrona que controla todas as etapas da busca pelos resultados.
const controlSearch = async () => {
    // 1. Busca a 'query' a partir da 'view'. 
    const query = searchView.getInput();

    // Caso a 'query' exista...
    if (query) {
        // 2. Cria um novo objeto de busca e o adiciona ao objeto 'state'. 
        state.search = new Search(query);

        // 3. Prepara a interface de usuário (UI) para os resultados. 
        searchView.clearInput();
        searchView.clearResults();

        // Renderiza uma animação de carregamento.
        renderLoader(elements.searchRes);
        
        try {
            // 4. Procura por receitas. 
            await state.search.getResults();
            
            // Remove a animação de carregamento.
            clearLoader(); 
    
            // 5. Renderiza os resultados na interface de usuário (UI). 
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something went wrong with the search!');
            clearLoader();
        }
    }
}

// Adiciona um 'event listener' no botão de 'submit'.
elements.searchForm.addEventListener('submit', (e) => {
    // Previne o comportamento padrão do elemento. Neste caso não vai permitir que a página recarregue ao pressionar o botão 'submit' para que a função a seguir possa ser executada.
    e.preventDefault();

    // Chama a função que cuida da busca pelos resultados.
    controlSearch();
});

// Adiciona um 'event listener' para os botões de paginação.
elements.searchResPages.addEventListener('click', (e) => {
    // Usa delegação de eventos para escutar as ações no elemento.
    const btn = e.target.closest('.btn-inline');

    // Se o elemento correspondente ao conteúdo de 'btn' for clicado...
    if (btn) {
        // Converte para um inteiro de base 10 e guarda o valor do 'data attribute' na variável.
        const goToPage = parseInt(btn.dataset.goto, 10);

        // Limpa os resultados anteriores da 'view'.
        searchView.clearResults();

        // Renderiza os resultados referentes à página do botão clicado.
        searchView.renderResults(state.search.result, goToPage);
    }
});

/***** CONTROLADOR DE RECEITAS *****/

const controlRecipe = async () => {
    // Retorna a parte do URL que segue após o 'hashtag', incluindo a própria 'hashtag'. Após isso substitui o 'hashtag' por um 'vazio' sobrando assim somente o ID.
    const id = window.location.hash.replace('#', ' ');

    console.log(id);

    if (id) {
        // 1. Prepara a interface de usuário para as mudanças.
        
        
        // 2. Cria um novo objeto de receita.
        state.recipe = new Recipe(id);

        try {
            // 3. Recebe os dados da receita.
            await state.recipe.getRecipe();

            // Analisa e traduz os ingredientes na forma de um objeto.
            state.recipe.parseIngredients();
    
            // 4. Calcula o tempo e o número de pessoas servidas.
            state.recipe.calcTime();
            state.recipe.calcServings();
    
            // 5. Renderiza a receita.
            console.log(state.recipe);
        } catch (err) {
            alert('Error processing recipe!');
        }
    }
}

// Adiciona um 'event listener' para cada alteração do 'hash' no URL.
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
