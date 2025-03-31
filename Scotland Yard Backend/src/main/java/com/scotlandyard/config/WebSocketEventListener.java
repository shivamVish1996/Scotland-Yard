package com.scotlandyard.config;

import com.scotlandyard.dto.UserInfo;
import com.scotlandyard.dto.UserStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@Slf4j
@RequiredArgsConstructor
public class WebSocketEventListener {

    private final SimpMessageSendingOperations messagingTemplate;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();
        log.info("Received a new websocket connection with sessionId {}", sessionId);
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String name = (String) headerAccessor.getSessionAttributes().get("name");
        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");
        if (name != null) {
            log.info("user disconnected: {}", name);

            UserInfo userInfo = new UserInfo();
            userInfo.setName(name);
            userInfo.setSessionId(headerAccessor.getSessionId());
            userInfo.setRoomId(roomId);
            userInfo.setStatus(UserStatus.LEFT);

            messagingTemplate.convertAndSend("/topic/room/" + roomId, userInfo);
        }
    }

}
