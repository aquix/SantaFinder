const GMAPS_API_KEY = require('json!../secretconfig.json').gmapsApiKey;

export class AppConfig {
    public static SERVER = 'http://localhost:9001';
    public static API_PATH = `${AppConfig.SERVER}/api`;
    public static GMAPS_API_KEY = GMAPS_API_KEY;
}