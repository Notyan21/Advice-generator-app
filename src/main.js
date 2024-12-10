const title = document.querySelector('.title');
const paragraph = document.querySelector('.paragraph');
const generateButton = document.querySelector('.generate__button');
const article = document.querySelector('.article');
const spinner = document.querySelector('.spinner');

const generateAdvice = async () => {

    generateButton.classList.add('cursor-not-allowed');
    generateButton.disabled = true;
    
    setTimeout(() => {
        article.classList.add('opacity-0');
        spinner.classList.remove('hidden');
    }, 100);

    const url = 'https://api.adviceslip.com/advice';

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Could not get advice');
        }

        const result = await response.json();
        showAdvice(result.slip);
        
        article.classList.remove('opacity-0');
        spinner.classList.add('hidden');
        
        setTimeout(() => {
            generateButton.classList.remove('cursor-not-allowed');
            generateButton.disabled = false;
        }, 200);
        
        
    } catch (error) {
        console.error(error);
    }

}

const showAdvice = (advices) => {

    const { id, advice } = advices;

    title.textContent = `advice #${id}`;
    paragraph.textContent = `"${advice}"`;

}   

generateButton.addEventListener('click', generateAdvice);


