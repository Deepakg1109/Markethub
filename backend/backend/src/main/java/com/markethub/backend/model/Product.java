package com.markethub.backend.model;

import jakarta.persistence.*;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;
    private String type;
    private double price;
    private String description;
    private String ownerEmail;
    private String imageUrl;
    private String sellerEmail;

    public Product() {}

    public Product(Long id, String name, String category, String type, double price, String description) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.type = type;
        this.price = price;
        this.description = description;
    }

    public String getOwnerEmail() {
    return ownerEmail;
}

    public void setOwnerEmail(String ownerEmail) {
    this.ownerEmail = ownerEmail;
}
    public Long getId() {
        return id;
    }

    public void setId(Long id) { 
        this.id = id; 
    }

    public String getName() { 
        return name; 
    }

    public void setName(String name) { 
        this.name = name; 
    }

    public String getCategory() { 
        return category; 
    }

    public void setCategory(String category) { 
        this.category = category; 
    }

    public String getType() { 
        return type; 
    }

    public void setType(String type) { 
        this.type = type; 
    }

    public double getPrice() { 
        return price; 
    }

    public void setPrice(double price) { 
        this.price = price; 
    }

    public String getDescription() { 
        return description; 
    }

    public void setDescription(String description) { 
        this.description = description; 
    }

    public String getImageUrl() {
    return imageUrl;
}

    public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
}
    public String getSellerEmail() {
    return sellerEmail;
}

    public void setSellerEmail(String sellerEmail) {
    this.sellerEmail = sellerEmail;
}
}