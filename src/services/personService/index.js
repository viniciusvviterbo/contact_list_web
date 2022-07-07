import { api_dotnet, api_nodejs } from "../api.js";

export async function getPerson(useApiDotnet = true, personId = 0) {
    const url = `persons/${personId || ""}`;
    const response = useApiDotnet
        ? await api_dotnet.get(url)
        : await api_nodejs.get(url);
    return response;
}

export async function createPerson(useApiDotnet = true, personObj) {
    const url = `persons/`;
    const response = useApiDotnet
        ? await api_dotnet.post(url, { ...personObj })
        : await api_nodejs.post(url, { ...personObj });
    return response;
}

export async function editPerson(useApiDotnet = true, personObj) {
    const url = `persons/${personObj.id}`;
    const response = useApiDotnet
        ? await api_dotnet.put(url, { ...personObj })
        : await api_nodejs.put(url, { ...personObj });
    return response;
}

export async function deletePerson(useApiDotnet = true, personId) {
    const url = `persons/${personId || ""}`;
    const response = useApiDotnet
        ? await api_dotnet.delete(url)
        : await api_nodejs.delete(url);
    return response;
}
