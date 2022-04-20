
export const getUsersByName = async (name = '', page = 0) => {
    // console.log("🚀 ~ file: getUsersByName.js ~ line 3 ~ getUsersByName ~ page", page)
    name = name.toLocaleLowerCase();
    const url = `https://api.github.com/search/users?q=${name}&per_page=12&page=${page}`
    const resp = await fetch(url);
    const { items, total_count, message } = await resp.json();
    return { items, total_count, message };
}
