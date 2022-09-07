package com.project.quanlybanhang_api.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UpLoadFileService implements UpLoadFileServiceImp{
	
	private final Path root = Paths.get("uploads");
	@Autowired
	ServletContext servletContext;
	
	@Override
	public void init() {
		try {
			if(!Files.exists(root)) {
			Files.createDirectories(root);
			}
		} catch (IOException e) {
			throw new  RuntimeException("Can't create folder uploads");
		}
	}

	@Override
	public boolean saveFile(MultipartFile file) {
		try {
			Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));
			return true;
		} catch (IOException e) {
			throw new  RuntimeException("Can't copy file to folder uploads!!");
		}
	}

	@Override
	public Resource loadFile(String filename) {
		try {
			Path file = this.root.resolve(filename);
			Resource resource = new UrlResource(file.toUri());
			if (resource.exists() || resource.isReadable()) {
				return resource;
			} else {
				throw new  RuntimeException("Can't read the file a!!");
			}
		} catch (Exception e) {
			throw new  RuntimeException("Can't read the file b!!");
		}
	}
}
