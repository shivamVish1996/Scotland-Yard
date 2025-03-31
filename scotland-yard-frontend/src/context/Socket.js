import SockJS from "sockjs-client";
import {over} from "stompjs";

let sock = new SockJS('http://localhost:8081/scotlandyard/ws')
const stompClient = over(sock)
console.log("connecting...")
stompClient.connect({},
    () => {
        console.log("connected")
        console.log("sock - ", sock)

        //get session id
        let urlArray = sock._transport.url.split('/')
        let index = urlArray.length - 2
        let sessionId = urlArray[index]
        console.log("sessionId - ", sessionId);
    },
    err => {
        console.log('error - ', err)
    }
)

export default stompClient;