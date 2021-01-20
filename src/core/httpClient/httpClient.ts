class HttpClient {

    execute = <TResult1, TResult2 = never>(input: RequestInfo, init?: RequestInit) => {
        return fetch(input, {
            mode: "cors",
            ...init,
        }).then<TResult1, TResult2>((response) => response.json());
    }
}

export default new HttpClient();
