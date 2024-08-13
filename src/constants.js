export const SocketEvent = Object.freeze({
    NEW_FRIEND_REQUEST: "NEW_FRIEND_REQUEST",
    ACCEPT_FRIEND_REQUEST: "ACCEPT_FRIEND_REQUEST",
    REJECT_FRIEND_REQUEST: "REJECT_FRIEND_REQUEST",
    CANCEL_FRIEND_REQUEST: "CANCEL_FRIEND_REQUEST",
    DELETE_FRIEND: "DELETE_FRIEND", 
});

export const RequestType = Object.freeze({
    ALL: "ALL",
    SENT: "SENT",
    RECEIVED: "RECEIVED",
});
 
export const RequestStatus = Object.freeze({
    ALL: "ALL",
    PENDING: "PENDING",
    CANCELED: "CANCELED",
    ACCEPTED: "ACCEPTED",
    REJECTED: "REJECTED", 
});