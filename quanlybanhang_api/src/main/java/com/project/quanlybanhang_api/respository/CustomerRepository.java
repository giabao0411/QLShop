package com.project.quanlybanhang_api.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.quanlybanhang_api.entity.Customer;
import com.project.quanlybanhang_api.entity.Staff;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

	public Customer findCustomerById(int Id);
}
