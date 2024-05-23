const token = localStorage.getItem("user-token");

// const instance = axios.create({
//     baseURL: 'http://localhost:5000/api/',
//     timeout: 1000,
//     headers: {
//        Authorization: 'Bearer ${token}'
//    }
// });

// const apiRequest = async (endpoint: string, options = {}) => {
//     const token = localStorage.getItem("user-token");
//     const defaultHeaders = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//     };

//     const config = {
//         ...options,
//         headers: {
//             ...defaultHeaders,
//             ...options.headers,
//         },
//     };

//     const response = await fetch(
//         `http://localhost:5000/api/${endpoint}`,
//         config
//     );
//     const data = await response.json();

//     if (!response.ok) {
//         throw new Error(data.message || "Something went wrong");
//     }

//     return data;
// };

type Options = {
    baseUrl?: string;
    defaultOpts?: RequestInit;
};

class HttpClient {
    baseUrl: string | undefined;
    defaultOpts: RequestInit;

    constructor(opts: Options) {
        if (opts.baseUrl) {
            // Strip trailing '/' from base URL
            this.baseUrl =
                opts.baseUrl.slice(-1) === "/"
                    ? opts.baseUrl.slice(0, -1)
                    : opts.baseUrl;
        }
        this.defaultOpts = opts.defaultOpts ?? {};
    }

    fetch(resource: string, opts: RequestInit = {}): Promise<Response> {
        if (resource.slice(0, 1) !== "/") {
            resource = `/${resource}`;
        }
        const url = this.baseUrl ? `${this.baseUrl}${resource}` : resource;
        return fetch(url, { ...this.defaultOpts, ...opts });
    }
}

const api = new HttpClient({ 
    baseUrl: "http://localhost:5000/api/",
    defaultOpts: {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    },
});

// usage
// const redditClient = new HttpClient('https://reddit.com');
// redditClient.fetch('/r/nextjs');

export default api;