package com.project.quanlybanhang_api.respository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.quanlybanhang_api.entity.Staff;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Integer>{	
	public Staff findStaffByEmail(String email);
	public Staff findStaffById(int Id);
}