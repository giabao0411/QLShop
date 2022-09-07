package com.project.quanlybanhang.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.quanlybanhang.pojo.Product;

@Controller
@RequestMapping("/laptop")
public class LaptopController {
	
	@GetMapping("")
	public ModelAndView home(HttpServletRequest request){
		ModelAndView andView = new ModelAndView("laptop");
		String respone;
		try {
			//list tablet type=2
			respone = getDataTypeGet("http://localhost:8080/product/list/laptop");
			ObjectMapper mapper = new ObjectMapper();
			Product[] products = mapper.readValue(respone, Product[].class);
			andView.addObject("products",products);
		} catch (IOException e) {
			e.printStackTrace();
		}		
		return andView;
	}
	private String getDataTypeGet(String url) throws IOException {
		// Khai báo sử dụng đường dẫn
		StringBuilder responeData = new StringBuilder();
		try {
			URL newURL = new URL(url);
			HttpURLConnection connection = (HttpURLConnection) newURL.openConnection();
			connection.setRequestMethod("GET");
			// Lấy inputstream (dữ liệu trả về từ url) từ đường dẫn
			InputStream inputStream = connection.getInputStream();
			// Đọc dữ liệu từ inputstream
			InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
			// Tạo bộ nhớ đệm
			BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
			
			String line = "";
			while ((line = bufferedReader.readLine()) != null) {
				responeData.append(line);
			}
			bufferedReader.close();
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return responeData.toString();
	}
}
