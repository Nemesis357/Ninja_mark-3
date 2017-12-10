package ninja.nenad.projectninja.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

//.access("hasRole('ROLE_ADMIN') or hasRole('ROLE_DBA')")
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	 @Override
	    protected void configure(HttpSecurity http) throws Exception {
	        http
	            .authorizeRequests()
	                .antMatchers("/about").authenticated()
	                .anyRequest().permitAll()
	                .and()
	            .formLogin()
	                .loginPage("/login")
	                .defaultSuccessUrl("/about")
	                .failureUrl("/shutdown")
	                .permitAll()
	                .usernameParameter("username").passwordParameter("password")	
	                .and()
	            .logout()
	                .permitAll();
//	                .and()
//	            .csrf().disable();
	    }

	 
	    @Autowired
	    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
	        auth
	            .inMemoryAuthentication()
	                .withUser("user").password("pass").roles("ADMIN");
	    }
}
