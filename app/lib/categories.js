import data from '../jsons/categories.json' assert {type: 'json'}

export const getPrincipalCategories = async () => {
    return data;
} 