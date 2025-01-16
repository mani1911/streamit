export const UPDATE_PEER = "UPDATE_PEER";
export const UPDATE_APP = "UPDATE_APP"

export interface IPeer {
    peerID : string | null,
    peer : any
}

export interface IApp {
    page : String
}