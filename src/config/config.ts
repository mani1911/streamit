interface IConfig {
    signalling_server_host : string,
    signalling_server_port : number 
}

export const config: IConfig = {
    signalling_server_host : 'localhost',
    signalling_server_port : 9000 
}