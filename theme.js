const colorPicker = document.getElementById('bg-color-picker');
const root = document.documentElement; 

const STORAGE_KEY = 'userBackgroundAccentColor';

function loadAndApplyAccentColor() {
    const savedColorHex = localStorage.getItem(STORAGE_KEY);
    
    if (savedColorHex) {
        if (colorPicker) { 
            colorPicker.value = savedColorHex;
        }
        root.style.setProperty('--user-chosen-color', savedColorHex);

    } else if (colorPicker) {
        localStorage.setItem(STORAGE_KEY, colorPicker.value);
        root.style.setProperty('--user-chosen-color', colorPicker.value);
    }
}


if (colorPicker) {
    colorPicker.addEventListener('input', (event) => {
        const newColorHex = event.target.value; 
        
        root.style.setProperty('--user-chosen-color', newColorHex);
        
        localStorage.setItem(STORAGE_KEY, newColorHex);
    });
}

loadAndApplyAccentColor();