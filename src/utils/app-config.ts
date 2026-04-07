class AppConfig {

}

class DevAppConfig extends AppConfig {
    apiAddress: string = "http://localhost:4000/"; // localhost/mockapi.io/api/
}

class ProdAppConfig extends AppConfig {
    apiAddress: string = "http://localhost:4000/";
}

export const appConfig = process.env.NODE_ENV === "production" ? new ProdAppConfig() : new DevAppConfig();



// class AppConfig {
//
// }
//
// class DevAppConfig extends AppConfig {
//     serverAddress = "http://localhost:4000";
//     apiAddress: string = this.serverAddress + "/api/";
//     uploadsAddress: string = this.serverAddress + "/uploads/";
// }
//
// class ProdAppConfig extends AppConfig {
//     serverAddress = "http://localhost:4000";
//     apiAddress: string = this.serverAddress + "/api/";
//     uploadsAddress: string = this.serverAddress + "/uploads/";
// }
//
// export const appConfig = process.env.NODE_ENV === "production" ? new ProdAppConfig() : new DevAppConfig;
