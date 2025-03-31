package com.scotlandyard;

import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ScotlandYardBackendApplicationTests {

	@Test
	void contextLoads() {
		String roomId = RandomStringUtils.randomAlphabetic(5);
		System.out.println(roomId);
	}

}
