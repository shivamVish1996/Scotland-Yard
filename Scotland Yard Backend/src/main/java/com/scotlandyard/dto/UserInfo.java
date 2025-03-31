package com.scotlandyard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserInfo {
    String name;
    String sessionId;
    String roomId;
    UserStatus status;
}
