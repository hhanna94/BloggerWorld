package com.hh.bloggerworld.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.hh.bloggerworld.services.UserDetailsServiceImplementation;



@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
		// @Secured, allows me to protect controller/service methods
        securedEnabled = true,
        // @RolesAllowed("ROLE_ADMIN") as an example
        jsr250Enabled = true,
        // @PreAuthorize("isAnonymous()") as an example
        prePostEnabled = true
)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{
	@Autowired
	private UserDetailsServiceImplementation userDetailsService;
	
	// Returns 401 unauthorized error to clients that try to access a resource without proper authentication
	@Autowired
	private JwtAuthenticationEntryPoint unauthorizedHandler;
	
	// Reads and validates JWT token from Authorization header, loads the user details associated with the token and sets the user details in Spring Security's SecurityContext to perform authorization checks and use it to perform logic
	@Bean
	public JwtAuthenticationFilter jwtAuthenticationFilter() {
		return new JwtAuthenticationFilter();
	}
	
	@Bean(BeanIds.AUTHENTICATION_MANAGER)
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	
	// Add BCrypt bean
	@Bean
	public static BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	
	@Override
	public void configure(HttpSecurity http) throws Exception {
		http
			.cors()
				.and()
			.csrf()
				.disable()
			// ADDED THIS
			.exceptionHandling()
				.authenticationEntryPoint(unauthorizedHandler)
				.and()
			.sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
			// END ADD
			.authorizeRequests()
				.antMatchers("/api/**").permitAll()
				.anyRequest().authenticated()
				.and()
			.formLogin()
				.loginPage("/login")
				.permitAll()
				.and()
			.logout()
				.permitAll();
		// ADDED THIS
		http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
	}
	
	//Configures Spring Security to user our custom implementation of the UserDetailsService with Bcrypt
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
	}

	
	

}
