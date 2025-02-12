interface IConfig {
    signalling_server_host : string,
    signalling_server_port : number ,
    backend_url: string
}

export const config: IConfig = {
    backend_url : 'app.mani1911.work.gd',
    signalling_server_host : 'peer.mani1911.work.gd',
    signalling_server_port : 9000 
}
