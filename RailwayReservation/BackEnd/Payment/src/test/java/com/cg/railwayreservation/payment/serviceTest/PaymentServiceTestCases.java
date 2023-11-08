package com.cg.railwayreservation.payment.serviceTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.cg.railwayreservation.payment.entity.Payment;
import com.cg.railwayreservation.payment.exception.PaymentFailException;
import com.cg.railwayreservation.payment.exception.PaymentNotFoundWithIdException;
import com.cg.railwayreservation.payment.repository.PaymentRepository;
import com.cg.railwayreservation.payment.service.PaymentServiceImp;

@SpringBootTest
public class PaymentServiceTestCases {
	
    @InjectMocks
    private PaymentServiceImp paymentService;

    @Mock
    private PaymentRepository paymentRepository;
    

    @Test
    public void testDoPayment_Success() throws Exception {
    	//throws PaymentFailException {
        String userName = "user123";
        String bookingId = "booking123";
        double amount = 500.0;

        Payment payment = new Payment();
        payment.setTransactionId(123);
        payment.setUsername(userName);
        payment.setAmount(amount);
        payment.setTransactionStatus("Payment Successfull");
        payment.setBookingId(bookingId);

        when(paymentRepository.save(any(Payment.class))).thenReturn(payment);

        Payment result = paymentService.doPayment(userName, bookingId, amount);

        assertNotNull(result);
        assertEquals(userName, result.getUsername());
        assertEquals(amount, result.getAmount());
        assertEquals("Payment Successfull", result.getTransactionStatus());
        assertEquals(bookingId, result.getBookingId());
    }
    
    @Test
    public void testDoPayment_Failure() {
        String userName = "user123";
        String bookingId = "booking123";
        double amount = 500.0;

        when(paymentRepository.save(any(Payment.class))).thenThrow(new RuntimeException("Simulated Payment Failure"));

        assertThrows(PaymentFailException.class, () -> {
            paymentService.doPayment(userName, bookingId, amount);
        });
    }
    
    @Test
    public void testGetPayment_Success() throws PaymentNotFoundWithIdException {
        String bookingId = "booking123";

        Payment payment = new Payment();
        payment.setBookingId(bookingId);

        when(paymentRepository.findByBookingId(bookingId)).thenReturn(payment);

        Payment result = paymentService.getPayment(bookingId);

        assertNotNull(result);
        assertEquals(bookingId, result.getBookingId());
    }

    @Test
    public void testGetPayment_PaymentNotFound() {
        String bookingId = "nonexistentBookingId";

        when(paymentRepository.findByBookingId(bookingId)).thenReturn(null);

        assertThrows(PaymentNotFoundWithIdException.class, () -> {
            paymentService.getPayment(bookingId);
        });
    }

}
