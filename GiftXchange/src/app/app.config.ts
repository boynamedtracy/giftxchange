export class AppConfig {
  public readonly apiUrl = '/api';
  public urlRoot() : string {
    var protocol: string = window.location.protocol;
    var host: string = window.location.hostname;
    var port: string = window.location.port;
    return protocol + '//' + host + (port != '80' ? ':' + port : '');
  }
};
