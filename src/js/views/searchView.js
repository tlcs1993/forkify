import { elements } from './base';

// Função que retorna o valor do 'input'.
export const getInput = () => elements.searchInput.value;

// Função que limpa o 'input'.
export const clearInput = () => {
    elements.searchInput.value = '';
};

// Função que limpa a lista de resultados e botões de paginação.
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

// Função que recebe o título e um limite de caracteres (17 caracteres por padrão) retorna uma string com até limite máximo escolhido.
const limitRecipeTitle = (title, limit = 17) => {
    // Vetor que receberá o resultado.
    const newTitle = [];

    // Caso o tamanho do título seja maior que o limite, o que significa que precisará ser cortado...
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            // Se a soma do acumulador e do tamanho do elemento atual for menor ou igual que o limite...
            if (acc + cur.length <= limit) {
                // O elemento atual é embutido no final do novo vetor.
                newTitle.push(cur);
                
                // Atualiza o acumulador, que é a soma do acumulador com o tamanho do elemento atual. O retorno é obrigatório.
                return acc + cur.length;
            }
        }, 0);

        // Retorna o novo título unido a partir dos espaços.
        return `${newTitle.join(' ')} ...`;
    }

    // Retorna o título original caso este seja menor que o limite.
    return title;
} 

// Função privada que renderiza individualmente cada elemento do 'vetor' dos resultados.
const renderRecipe = (recipe) => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    // Insere o elemento atual 'markup' no 'index.html'.
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// Cria um botão de acordo com o seu tipo.
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

// Renderiza os botões de paginação de acordo com a ocasião.
const renderButtons = (page, numResults, resPerPage) => {
    // Calcula o número de páginas e arredonda para cima caso o resultado não seja inteiro.
    const pages = Math.ceil(numResults / resPerPage);

    let button;

    // Caso seja a primeira página e existam mais de uma página... 
    if (page === 1 && pages > 1) {
        button = createButton(page, 'next');
    // Caso não seja nem a primeira nem a última página de várias...
    } else if (page < pages) {
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    // Caso seja a última página de várias...
    } else if (page === pages && pages > 1) {
        button = createButton(page, 'prev');
    } 

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

// Renderiza os elementos do resultado da busca na 'view' levando em consideração a página e a quantidade máxima de elementos por página.
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    /* Renderiza os resultados da página atual */

    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    /* Renderiza os botões da página */

    renderButtons(page, recipes.length, resPerPage);
};
