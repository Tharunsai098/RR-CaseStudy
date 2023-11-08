package com.cg.railwayreservation.payment.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class PaymentFailException extends Exception {
 public PaymentFailException(String message) {
	// TODO Auto-generated constructor stub
	 super(message);
}
}
