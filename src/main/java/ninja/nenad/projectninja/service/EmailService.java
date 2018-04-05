<<<<<<< HEAD
package ninja.nenad.projectninja.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import ninja.nenad.projectninja.domain.Mail;

@Service
public class EmailService {
	@Autowired
    private JavaMailSender emailSender;

    public void sendSimpleMessage(final Mail mail){
        SimpleMailMessage message = new SimpleMailMessage();
        
        System.out.println("In Email Service: " + mail);
        message.setSubject("Message from: " + mail.getFrom());
        message.setText("Name:" + mail.getFrom() + "\n Company: " + mail.getCompany() + "\n Message:" + mail.getMessage());
        message.setTo(mail.getTo());
        message.setFrom(mail.getFrom());

        emailSender.send(message);
    }
=======
package ninja.nenad.projectninja.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import ninja.nenad.projectninja.domain.Mail;

@Service
public class EmailService {
	@Autowired
    private JavaMailSender emailSender;

    public void sendSimpleMessage(final Mail mail){
        SimpleMailMessage message = new SimpleMailMessage();
        
        System.out.println("In Email Service: " + mail);
        message.setSubject("Message from: " + mail.getFrom());
        message.setText("Name:" + mail.getFrom() + "\n Company: " + mail.getCompany() + "\n Message:" + mail.getMessage());
        message.setTo(mail.getTo());
        message.setFrom(mail.getFrom());

        emailSender.send(message);
    }
>>>>>>> 7088720c3591da1893de70276853843c88f368dc
}