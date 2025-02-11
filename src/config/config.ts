interface IConfig {
    signalling_server_host : string,
    signalling_server_port : number ,
    backend_url: string
}

export const config: IConfig = {
    signalling_server_host : 'localhost',
    signalling_server_port : 9000,
    backend_url : 'http://127.0.0.1:5000'
}