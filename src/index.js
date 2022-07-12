
const getTemplate = (data = [], placeholder) => {

    const items = data.map(item => {
        return `
        <li class="select__item" data-type = "item" data-id = "${item.id}">${item.value}</li>
        `;
    });

    return `
    <div class = "select__backdrop" data-type = "backdrop"></div>
    <div class="select__input" data-type = "input">
        <span data-type = "value">${placeholder}</span>
        <svg data-type = "arrow" class="svg-icon down" viewBox="0 0 20 20">
            <path fill="none" d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
        </svg>
    </div>
    <div class="select__dropdown">
        <ul class="select__list">
            ${items.join('')}
        </ul>
    </div>
    `;
};



function select (selector, options) {
    let el = document.querySelector(selector);
    let option = options;

    render();
    setup();

    function render () {
        const {placeholder, data} = option;
        el.classList.add('select');
        el.innerHTML = getTemplate (data, placeholder);
    }

    function setup () {
        el.addEventListener('click', clickHandler);
    }

    function clickHandler (event) {
        const {type} = event.target.dataset;
        
        if (type === 'input') {
            toggle();
        } else if (type === "item") {
            const id = event.target.dataset.id;
            selectItem(id);
        } else if (type === "backdrop") {
            close();
        }
    }

    function selectItem(id) {
        let selectedId = id;
        let value = el.querySelector('[data-type = "value"]');
        let current = options.data.find(item => item.id === selectedId);
        value.textContent = current.value;

        el.querySelectorAll('[data-type = "item"]').forEach(el => {
            el.classList.remove('selected');
        });
        el.querySelector(`[data-id = "${id}"]`).classList.add('selected');

        close();
    }

    function toggle () {
        if (el.classList.contains('open')) {
            close();
        } else {
            open ();
        }
    }

    let arrow = document.querySelector('.svg-icon');

    function open () {
        el.classList.add('open');
        arrow.classList.remove('down');
        arrow.classList.add('up');
    }

    function close () {
        el.classList.remove('open');
        arrow.classList.add('down');
        arrow.classList.remove('up');
    }
}



select ('#select', {
    placeholder: 'Выберите элемент',
    data: [
        {id: '1', value: 'React'},
        {id: '2', value: 'Vue'},
        {id: '3', value: 'Angular'},
        {id: '4', value: 'React Native'},
        {id: '5', value: 'Next'},
        {id: '6', value: 'TypeScript'}
    ],
});