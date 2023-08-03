package com.itransform.productservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="Order")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Getter
@Setter
public class Order {
    @Id
    private String id;
    private String name;
    private String description;
    private String price;
    private String userName;
}
