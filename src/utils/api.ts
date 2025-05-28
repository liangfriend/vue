import axios from "axios";

const baseUrl = 'http://localhost:3000';
const aiUrl = 'http://localhost:11434';

type baseUrlMode = 'base' | 'ai'

interface apiParam {
    mode: baseUrlMode,
    url: string,
    data: any
}

function getSuffixPath(mode: baseUrlMode): string {
    switch (mode) {
        case 'base':
            return baseUrl;
        case 'ai':
            return aiUrl
    }
}

const api = {
    post: async (params: apiParam) => {
        const suffix = getSuffixPath(params.mode)
        const url = suffix + params.url;
        return await axios.post(url, params.data)
    }
}
export {api}


