package com.cg.railwayreservation.payment.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection="payment")
public class Payment {
	@Id
	private int transactionId;
	private String bookingId;
	private String username;
	private double amount;
	private String transactionStatus;
	
}
