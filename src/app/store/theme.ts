export const changeTheme = (mode: 'light'|'dark') => {
    const meta_theme = document.querySelector('meta[name="theme-color"]');
    switch(mode){
        case 'light':
                document.documentElement.classList.add('light');
                document.documentElement.classList.remove('dark');
                meta_theme?.setAttribute("content", "#A9A9A9");
                break;
        case 'dark':
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
            meta_theme?.setAttribute("content", "#121212");
            break;
    }
}