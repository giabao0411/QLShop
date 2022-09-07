package com.project.quanlybanhang_api.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.quanlybanhang_api.entity.Product;
import com.project.quanlybanhang_api.respository.ProductRepository;

@Service
public class ProductService implements ProductServiceImp{

	@Autowired
	ProductRepository productRepository;
	@Override
	public List<Product> findAll() {
		return productRepository.findAll();
	}

	@Override
	public void insertProduct(Product product) {
		productRepository.save(product);		
	}

	@Override
	public void deleteProduct(int id) {
		productRepository.deleteById(id);
	}

	@Override
	public void updateProduct(Product product) {
		productRepository.save(product);
	}

	@Override
	public Product findById(int id) {
		return productRepository.findById(id);
	}

	@Override
	public List<Map<String, ?>> getProductByPhone() {
		// TODO Auto-generated method stub
		return productRepository.getProductByPhone();
	}

	@Override
	public List<Map<String, ?>> getProductByTablet() {
		// TODO Auto-generated method stub
		return productRepository.getProductByTablet();
	}

	@Override
	public List<Map<String, ?>> getProductByLaptop() {
		// TODO Auto-generated method stub
		return productRepository.getProductByLaptop();
	}

	@Override
	public List<Map<String, ?>> getProductByOther() {
		// TODO Auto-generated method stub
		return productRepository.getProductByOther();
	}
	
}
