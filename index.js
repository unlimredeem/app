document.addEventListener('DOMContentLoaded', () => {

    const runButton = document.getElementById('run-btn');
    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const jsCode = document.getElementById('js-code');
    const outputIframe = document.getElementById('output-iframe');
    const tabButtons = document.querySelectorAll('.tab-button');
    const codeInputs = document.querySelectorAll('.code-input');


    function runCode() {
        if (!outputIframe) return;

        const srcDoc = `
            <html>
                <head>
                    <style>${cssCode.value}</style>
                </head>
                <body>
                    ${htmlCode.value}
                    <script>${jsCode.value}</script>
                </body>
            </html>
        `;

        const output = outputIframe.contentWindow.document;
        output.open();
        output.write(srcDoc);
        output.close();
    }

    function switchTab(e) {
        const targetTab = e.target.dataset.tab;

        tabButtons.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === targetTab);
        });

        codeInputs.forEach(input => {
            input.classList.toggle('active', input.id.startsWith(targetTab));
        });
    }

    if (runButton) {
        runButton.addEventListener('click', runCode);
    }


    tabButtons.forEach(button => {
        button.addEventListener('click', switchTab);
    });

    if (runButton) {
        runCode();
    }

    const c_bg = document.getElementById('c-bg');
    const color_picker = document.getElementById("color-picker");
    const hero = document.getElementsByClassName("hero")[0];

    if (c_bg && color_picker && hero) {
        const bgInputHandler = () => {
            const newColor = color_picker.value;
            document.body.style.backgroundColor = newColor;
            if (hero) {
                hero.style.backgroundColor = newColor;
            }
        };
        
        c_bg.addEventListener('click', () => {
            color_picker.style.display = "block";
            color_picker.style.justifySelf = "center";
            color_picker.style.margin = '20px';

            color_picker.addEventListener('input', bgInputHandler);
            
            c_bg.textContent = `Reset Background Color`;
            c_bg.onclick = () => {
                window.location.reload();
            };

        }, { once: true });
    }

    const c_color = document.getElementById('c-color');
    const text_color_picker = document.getElementById('text-color-picker');
    const reset_color = document.getElementById('reset-color');
    let isColorInspecting = false;
    let selectedElement = null;

    if (c_color && text_color_picker && reset_color) {
        c_color.addEventListener('click', () => {
            isColorInspecting = !isColorInspecting;
            isFontInspecting = false; 

            if (isColorInspecting) {
                document.body.style.cursor = 'crosshair';
                c_color.textContent = 'Inspecting... Click Text';
                if(c_font) c_font.textContent = 'Change Text Font'; 
                if (selectedElement) {
                    selectedElement.classList.remove('selected-for-color-change');
                    selectedElement = null;
                }
                text_color_picker.style.display = 'none';
            } else {
                document.body.style.cursor = 'default';
                c_color.textContent = 'Change Text Color';
            }
        });

        text_color_picker.addEventListener('input', () => {
            if (selectedElement) {
                selectedElement.style.color = text_color_picker.value;
                reset_color.style.display = 'block';
                reset_color.textContent = 'Reset all Colors';
                reset_color.onclick = () => {
                    window.location.reload();
                };
            }
        });
    }

    const c_font = document.getElementById('c-font');
    const font_picker = document.getElementById('font-size-input');
    const reset_font = document.getElementById('reset-font');
    let isFontInspecting = false;
    let selectedFontElement = null;

    if (c_font && font_picker && reset_font) {
        c_font.addEventListener('click', () => {
            isFontInspecting = !isFontInspecting;
            isColorInspecting = false; 

            if (isFontInspecting) {
                document.body.style.cursor = 'crosshair';
                c_font.textContent = 'Inspecting... Click Text';
                if(c_color) c_color.textContent = 'Change Text Color'; 
                if (selectedFontElement) {
                    selectedFontElement.classList.remove('selected-for-font-change');
                    selectedFontElement = null;
                }
                font_picker.style.display = 'none';
            } else {
                document.body.style.cursor = 'default';
                c_font.textContent = 'Change Text Font';
            }
        });

        font_picker.addEventListener('input', () => {
            if (selectedFontElement) {
                selectedFontElement.style.fontSize = font_picker.value + 'px';
                
                reset_font.style.display = 'block';
                reset_font.textContent = 'Reset all Fonts';
                reset_font.onclick = () => {
                    window.location.reload();
                };
            }
        });
    }

    document.addEventListener("click", (e) => {
        if (e.target.closest('.tool-card')) return; 

        if (isColorInspecting) {
            selectedElement = e.target;
            selectedElement.classList.add('selected-for-color-change');
            if(text_color_picker) text_color_picker.style.display = 'block';

            isColorInspecting = false;
            document.body.style.cursor = 'default';
            if(c_color) c_color.textContent = 'Change Text Color';
        } 
        else if (isFontInspecting) {
            selectedFontElement = e.target;
            selectedFontElement.classList.add('selected-for-font-change');
            if(font_picker) font_picker.style.display = 'block'; 

            isFontInspecting = false;
            document.body.style.cursor = 'default';
            if(c_font) c_font.textContent = 'Change Text Font'; 
        }
    });

    const nav = document.querySelector('nav');
    if (nav) {
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > 80) {
                nav.classList.add('nav-hidden');
            } else {
                nav.classList.remove('nav-hidden');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, {
        threshold: 0.1
    });

    const hiddenSections = document.querySelectorAll('.hidden-section');
    hiddenSections.forEach(el => observer.observe(el));
    
});