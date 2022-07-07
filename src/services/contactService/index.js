import { api_dotnet, api_nodejs } from "../api.js";

export async function getContact(useApiDotnet = true, contactId = 0) {
    const url = `contacts/${contactId || ""}`;
    const response = useApiDotnet
        ? await api_dotnet.get(url)
        : await api_nodejs.get(url);
    return response;
}

export async function getPersonsContact(useApiDotnet = true, contactId) {
    const url = `contacts/person/${contactId}`;
    const response = useApiDotnet
        ? await api_dotnet.get(url)
        : await api_nodejs.get(url);
    return response;
}

export async function createContact(useApiDotnet = true, contactObj) {
    const url = `contacts/`;
    const response = useApiDotnet
        ? await api_dotnet.post(url, { ...contactObj })
        : await api_nodejs.post(url, { ...contactObj });
    return response;
}

export async function editContact(useApiDotnet = true, contactObj) {
    const url = `contacts/${contactObj.id}`;
    const response = useApiDotnet
        ? await api_dotnet.put(url, { ...contactObj })
        : await api_nodejs.put(url, { ...contactObj });
    return response;
}

export async function deleteContact(useApiDotnet = true, contactId) {
    const url = `contacts/${contactId || ""}`;
    const response = useApiDotnet
        ? await api_dotnet.delete(url)
        : await api_nodejs.delete(url);
    return response;
}