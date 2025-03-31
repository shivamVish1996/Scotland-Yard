package com.scotlandyard.controller;

import com.scotlandyard.dto.UserInfo;
import com.scotlandyard.dto.UserStatus;
import lombok.Data;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.user.SimpUser;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@Data
@RestController
public class RoomController {

    private final SimpMessageSendingOperations simpMessageSendingOperations;
    private final SimpUserRegistry simpUserRegistry;

    @MessageMapping("/createRoom/{roomId}")
//    @SendTo("/topic/room/{roomId}")
    public void createRoom(
            @DestinationVariable String roomId,
//            UserInfo userInfo,
            SimpMessageHeaderAccessor headerAccessor) {

//        String roomId = RandomStringUtils.randomAlphabetic(5);
//        System.out.println("UserInfo - " + userInfo);
        System.out.println("roomId = " + roomId);
        System.out.println("headerAccessor - " + headerAccessor);
        System.out.println("session id - " + headerAccessor.getSessionId());
//        userInfo.setSessionId(headerAccessor.getSessionId());
//        userInfo.setRoomId(roomId);
        simpMessageSendingOperations.convertAndSend("/topic/room/" + roomId,
                new UserInfo());
    }

    @MessageMapping("/joinRoom/{roomId}")
//    @SendTo("/topic/room/{roomId}")
    public void joinRoom(
            @DestinationVariable("roomId") String roomId,
            UserInfo userInfo,
            SimpMessageHeaderAccessor headerAccessor) {

        System.out.println("UserInfo - " + userInfo);
        System.out.println("Room id - " + roomId);
        System.out.println("headerAccessor - " + headerAccessor);
        System.out.println("session id - " + headerAccessor.getSessionId());
        userInfo.setSessionId(headerAccessor.getSessionId());
        userInfo.setRoomId(roomId);
        userInfo.setStatus(UserStatus.JOINED);
        headerAccessor.getSessionAttributes().put("name", userInfo.getName());
        headerAccessor.getSessionAttributes().put("roomId", roomId);
        simpMessageSendingOperations.convertAndSend("/topic/room/" + roomId,
                userInfo);
    }

    @GetMapping("/websocket.users")
    public Set<SimpUser> getUsers() {
        Set<SimpUser> users = simpUserRegistry.getUsers();
        System.out.println(users);
        return users;
    }

}
