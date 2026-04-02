package com.markethub.backend.controller;
import com.markethub.backend.security.JwtUtil;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;
import com.markethub.backend.model.Product;
import com.markethub.backend.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.markethub.backend.security.JwtUtil;

@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private JwtUtil jwtUtil;
    
    private final String UPLOAD_DIR = System.getProperty("user.dir") + File.separator + "uploads";

  @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
public Product addProduct(
        @RequestParam("name") String name,
        @RequestParam("category") String category,
        @RequestParam("type") String type,
        @RequestParam("price") double price,
        @RequestParam("description") String description,
        // @RequestParam("image") MultipartFile image,
        @RequestParam(value = "image", required= false) MultipartFile image,
        @RequestHeader("Authorization") String authHeader
) throws IOException {

    String token = authHeader.substring(7);
    String email = jwtUtil.extractEmail(token);

    File uploadFolder = new File(UPLOAD_DIR);
    if (!uploadFolder.exists()) {
        uploadFolder.mkdirs();
    }

    String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
    String filePath = UPLOAD_DIR + File.separator + fileName;
    image.transferTo(new File(filePath));

    Product product = new Product();
    product.setName(name);
    product.setCategory(category);
    product.setType(type);
    product.setPrice(price);
    product.setDescription(description);
    product.setOwnerEmail(email);
    product.setSellerEmail(email);
    product.setImageUrl("http://localhost:8080/uploads/" + fileName);


    return productService.addProduct(product);
}

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @GetMapping("/my-products")
    public List<Product> getMyProducts(@RequestHeader("Authorization") String authHeader) {
    String token = authHeader.substring(7);
    String email = jwtUtil.extractEmail(token);

    return productService.getProductsByOwner(email);
}

   @PutMapping("/update/{id}")
public Product updateProduct(
        @PathVariable Long id,
        @RequestBody Product updatedProduct,
        @RequestHeader("Authorization") String authHeader

) {
    String token = authHeader.substring(7);
    String email = jwtUtil.extractEmail(token);

    Product existingProduct = productService.getProductById(id);

    if (existingProduct == null) {
        throw new RuntimeException("Product not found");
    }

    if (!existingProduct.getOwnerEmail().equals(email)) {
        throw new RuntimeException("Unauthorized: Not your product");
    }

    existingProduct.setName(updatedProduct.getName());
    existingProduct.setCategory(updatedProduct.getCategory());
    existingProduct.setType(updatedProduct.getType());
    existingProduct.setPrice(updatedProduct.getPrice());
    existingProduct.setDescription(updatedProduct.getDescription());

    return productService.addProduct(existingProduct);
}
    @DeleteMapping("/delete/{id}")
  public String deleteProduct(
        @PathVariable Long id,
        @RequestHeader("Authorization") String authHeader
) {
    try {
        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

        Product product = productService.getProductById(id);

        if (product == null) {
            return "Product not found";
        }

        if (product.getOwnerEmail() == null) {
            return "This product has no owner. Please delete it manually from DB once.";
        }

        if (!product.getOwnerEmail().equals(email)) {
            return "Unauthorized: Not your product";
        }

        productService.deleteProduct(id);
        return "Deleted successfully";

    } catch (Exception e) {
        e.printStackTrace();
        return "Error while deleting product: " + e.getMessage();
    }
}
}