document.addEventListener('DOMContentLoaded', () => {
    const neededItemsList = document.getElementById('neededItems');
    const unneededItemsList = document.getElementById('unneededItems');
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItemButton');

    const initialItems = [
        "속옷",
        "양말",
        "티셔츠",
        "바지",
        "칫솔",
        "치약",
        "세면도구",
        "수건",
        "휴대폰 충전기",
        "지갑",
        "여권"
    ];

    function loadItems() {
        const savedNeededItems = JSON.parse(localStorage.getItem('neededItems')) || initialItems;
        const savedUnneededItems = JSON.parse(localStorage.getItem('unneededItems')) || [];
        neededItemsList.innerHTML = '';
        unneededItemsList.innerHTML = '';
        savedNeededItems.forEach(item => addItemToDOM(item, neededItemsList));
        savedUnneededItems.forEach(item => addItemToDOM(item, unneededItemsList));
    }

    function saveItems() {
        const neededItems = Array.from(neededItemsList.children).map(item => item.firstChild.textContent);
        const unneededItems = Array.from(unneededItemsList.children).map(item => item.firstChild.textContent);
        localStorage.setItem('neededItems', JSON.stringify(neededItems));
        localStorage.setItem('unneededItems', JSON.stringify(unneededItems));
    }

    function addItemToDOM(text, list) {
        const li = document.createElement('li');
        li.textContent = text;
        list.appendChild(li);

        li.addEventListener('click', () => {
            if (list === neededItemsList) {
                unneededItemsList.appendChild(li);
            } else {
                neededItemsList.appendChild(li);
            }
            saveItems();
        });
    }

    addItemButton.addEventListener('click', () => {
        const text = itemInput.value.trim();
        if (text) {
            addItemToDOM(text, neededItemsList);
            itemInput.value = '';
            saveItems();
        }
    });

    itemInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addItemButton.click();
        }
    });

    loadItems();
});
