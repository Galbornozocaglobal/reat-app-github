

export const getUserByUserName =  async (name = '') => {

    name = name.toLocaleLowerCase();
    const url = `https://api.github.com/users/${name}`
    const resp =  await fetch(url);
    const  items  = await resp.json();
    return items ;
}
