import '../styles/style.scss';

document.addEventListener('DOMContentLoaded', () => {
    let changeMode = document.querySelector('.change-mode');
    let body = document.querySelector('body');
    let list = document.querySelector('.list');
    const calendar = document.querySelector('.calendar');
    const dateItems = calendar.querySelectorAll('.list__item');
    let rangeStart = null;
    let rangeEnd = null;
    let isSelecting = false;
    let isFirstClick = true;

    function handleChangeMode() {
        if(body.classList.contains('light')) {
            body.classList.remove('light');
            body.classList.add('dark');
            changeMode.classList.remove('button_dark');
            changeMode.classList.add('button_light');
            changeMode.innerHTML = 'light mode';
        } else if(body.classList.contains('dark')) {
            body.classList.remove('dark');
            body.classList.add('light');
            changeMode.classList.remove('button_light');
            changeMode.classList.add('button_dark');
            changeMode.innerHTML = 'dark mode';
        }
    }

    function clearRange() {
        dateItems.forEach(item => {
            item.classList.remove('list__item_in-range', 'list__item_range-start', 'list__item_range-end');
        });
        if(list.classList.contains('list_search')) {
            list.classList.remove('list_search');
        }
    }

    function updateRange() {
        clearRange();
        
        if (!rangeStart || !rangeEnd) return;

        const start = Math.min(rangeStart, rangeEnd);
        const end = Math.max(rangeStart, rangeEnd);

        dateItems.forEach((item, index) => {
            const date = index + 1;
            
            if (date === start) {
                item.classList.add('list__item_range-start');
            } else if (date === end) {
                item.classList.add('list__item_range-end');
                list.classList.add('list_search');
            } else if (date > start && date < end) {
                item.classList.add('list__item_in-range');
            }
        });
    }

    dateItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            if (isFirstClick) {
                rangeStart = index + 1;
                rangeEnd = index + 1;
                isFirstClick = false;
            } else {
                rangeEnd = index + 1;
                isFirstClick = true;
            }
            updateRange();
        });

        item.addEventListener('mouseenter', (e) => {
            if (isSelecting) {
                rangeEnd = index + 1;
                updateRange();
            }
        });
    });

    document.addEventListener('mouseup', () => {
        isSelecting = false;
    });
    changeMode.addEventListener('click', handleChangeMode);
});

