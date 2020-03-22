import { elements } from './base';

// Função que retorna o valor do 'input'.
export const getInput = () => elements.searchInput.value;

// Função que limpa o 'input'.
export const clearInput = () => {
    elements.searchInput.value = '';
};

// Função que limpa a lista de resultados.
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
};

// Função privada que renderiza individualmente cada elemento do 'array' dos resultados.
const renderRecipe = (recipe) => {
    const markup = `
        <li>
            <a class="results__link" href="${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// Renderiza todos os elementos do resultado da busca na 'view'.
export const renderResults = (recipes) => {
    recipes.forEach(renderRecipe);
};
