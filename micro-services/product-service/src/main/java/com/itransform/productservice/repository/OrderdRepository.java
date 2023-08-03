package com.itransform.productservice.repository;

import com.itransform.productservice.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderdRepository extends MongoRepository<Order,String> {

}
