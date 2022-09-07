package com.project.quanlybanhang_api.respository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.quanlybanhang_api.entity.StaffRoles;

@Repository
public interface StaffRolesResponsitory extends JpaRepository<StaffRoles, Integer> {
	@Query(value = "call GetAllRoleByStaff(:email)", nativeQuery = true)
	List<Map<String, ?>> getRoleNameByStaff(@Param("email") String email);
	List<StaffRoles> findByStaffId(int staffId);
}
