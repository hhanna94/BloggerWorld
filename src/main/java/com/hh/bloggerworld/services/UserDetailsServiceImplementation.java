package com.hh.bloggerworld.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hh.bloggerworld.models.Role;
import com.hh.bloggerworld.models.User;
import com.hh.bloggerworld.models.UserPrincipal;
import com.hh.bloggerworld.repositories.UserRepo;

@Service
public class UserDetailsServiceImplementation implements UserDetailsService {
	@Autowired
	private UserRepo userRepo;
	
	@Override
	@Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        
        if(user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        
        return UserPrincipal.create(user);
    }
	
	@Transactional
	public UserDetails loadUserById(Long id) {
		Optional<User> optionalUser = userRepo.findById(id);
		
		if (!optionalUser.isPresent()) {
			throw new UsernameNotFoundException("User not found with id : " + id);
		}
		User user = optionalUser.get();
		return UserPrincipal.create(user);
	}
    
    // 2
//    private List<GrantedAuthority> getAuthorities(User user){
//        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
//        for(Role role : user.getRoles()) {
//            GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(role.getName());
//            authorities.add(grantedAuthority);
//        }
//        return authorities;
//    }
}
