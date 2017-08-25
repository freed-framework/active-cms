/**
 * @file .jsx
 * @author denglingbo
 *
 * Des
 */
export const BasicEdit = (rights) => {

    return (target, key, descriptor) => {

        target.menus = rights;

        console.log(rights)
        console.log(target)
        console.log(key)
        console.log(descriptor)
    }
}
