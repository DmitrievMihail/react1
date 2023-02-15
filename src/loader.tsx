const loadJSON = async (url:string) => {
    try {
        const loadData = await fetch(url);
        if (!loadData.ok) {
            throw new Error('Ошибка загрузки: Неверные данные');
        }
        return loadData.json();
    } catch {
        throw new Error('Ошибка загрузки: проблемы с сетью');
    }
};

export default loadJSON;
