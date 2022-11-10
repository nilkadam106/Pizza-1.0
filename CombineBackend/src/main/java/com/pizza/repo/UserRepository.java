package com.pizza.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pizza.entities.Users;

public interface UserRepository extends JpaRepository<Users, Integer> {
//	JpaRepository<Users,Integer> JpaRepository is a JPA-specific extension of the Repository.
//	It contains the full API of CrudRepository and PagingAndSortingRepository. So it contains API 
//	for basic CRUD operations and also API for pagination and sorting
	 
    @Query("SELECT u FROM Users u WHERE u.email = :email")
    public Users getUserByUsername(@Param("email") String username);

	public Optional<Users> findByEmail(String email);

	public Users findByPhoneNo(String phNumber);

	public Users findByUserId(int userId);
	
	public List<Users> findAllByRole(String string);

	public Optional<Users> findByPhoneNoAndEmail(String phoneNo, String email);
}