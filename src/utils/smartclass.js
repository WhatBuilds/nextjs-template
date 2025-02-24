
// this class is just a imitation of clsx as to manage classes from object 
// for the custom varients so based on object key it can assign the classes dynamicaly 

const toVal = (mix) => {
    if(!mix) return '';

    if (typeof mix === 'string' || typeof mix === 'number') {
        return String(mix);
    }

    if (Array.isArray(mix)) {
        return mix.map(toVal).filter(Boolean).join(' ');
    }

    return Object.keys(mix).filter((key) => mix[key]).join(' ');

}

/**
 * 
 * @returns 
 */
export const smartcls = (...args) => args.map(toVal).filter(Boolean).join(' ')