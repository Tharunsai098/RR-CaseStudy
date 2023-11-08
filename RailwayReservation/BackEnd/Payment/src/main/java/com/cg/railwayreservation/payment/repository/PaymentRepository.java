package com.cg.railwayreservation.payment.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.cg.railwayreservation.payment.entity.Payment;

public interface PaymentRepository extends MongoRepository<Payment, Integer> {

	//boolean existsByTransactionId(int transactionId);
	
	Payment findByBookingId(String bookingId);

}
