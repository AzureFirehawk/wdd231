export const resources = './data/orgs.json';

export async function getOrgData() {
    try {
        const response = await fetch(resources);
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

export function getUniqueCategories(data) {
    const categorySet = new Set();
    data.forEach(org => {
        const categories = Array.isArray(org.category) ? org.category : [org.category];
        categories.forEach(category => categorySet.add(category));
    });
    return Array.from(categorySet).sort();
}