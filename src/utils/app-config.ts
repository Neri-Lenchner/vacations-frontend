class AppConfig {

}

class DevAppConfig extends AppConfig {
    apiAddress: string = "http://localhost:5000"; // localhost/mockapi.io/api/
}

class ProdAppConfig extends AppConfig {
    apiAddress: string = "http://localhost:5000";
}

export const appConfig = process.env.NODE_ENV === "production" ? new ProdAppConfig() : new DevAppConfig;
