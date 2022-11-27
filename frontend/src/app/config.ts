export const config = {
    api: {
        baseUrl: "http://localhost:4200/api/v1/",
        tokenValue: (token: string) => "Token "+ token,
    }
}