class AppConfig {

}

class DevAppConfig extends AppConfig {
    apiAddress: string = "https://67b34380392f4aa94fa6893d.mockapi.io/api/"; // localhost/mockapi.io/api/
}

class ProdAppConfig extends AppConfig {
    apiAddress: string = "https://67b34380392f4aa94fa6893d.mockapi.io/api/";
}

export const appConfig = process.env.NODE_ENV === "production" ? new ProdAppConfig() : new DevAppConfig;
