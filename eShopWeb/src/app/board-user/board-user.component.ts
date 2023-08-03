import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService, Product } from '../service/product-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Products } from '../model/product.model';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../model/order.model';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {


  popoverTitle = 'Please Confirm!!';
  popoverMessage = 'Are You sure?';
  confirmClicked = false;
  cancelClicked = false;

  //@ts-ignore
  products : Products;

  //@ts-ignore
  product : Product[];

  //@ts-ignore
  products: Observable<ApiResponse>;

  //@ts-ignore
  Product: Observable<Product[]>;
  
  

  


  constructor(
    private productService:ProductServiceService ,private fb:FormBuilder,
    private router: Router,private toastr:ToastrService) {
      this.orderForm = fb.group({
        id:new FormControl(),
        name: new FormControl(),
        description:new FormControl(),
        price: new FormControl(),
       userName: new FormControl()
      }); 
  }

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  orders!:Order[];
  orderForm: FormGroup = new FormGroup({});

  finalProductdata:any;

  productordered = {
    id:'',
    name: '',
    description: '',
    price: '',
    userName:'',
  };


  
  ngOnInit(): void {
    // this.productService.findAllProducts().subscribe(
    //   response => this.handleSuccessfulResponse(response),
    // );
    // }
    // handleSuccessfulResponse(response: Product[]) {
    //   this.product = response;

    this.productService.findAllProducts().subscribe(response => {
      this.product = response;
      this.finalProductdata=new MatTableDataSource<Products>(this.product);
      this.finalProductdata.paginator=this.paginator;
      this.finalProductdata.sort=this.sort;
    }
    );
    }
    ordered(orders: any) {
      this.productordered = orders;
      console.log("order",this.productordered);
    }
    
  orderPlaced(){
    this.productService.orderProduct(this.productordered).subscribe({
      next:(res: any)=>{
       
        console.log(res);
        this.toastr.success("Ordered Succesfully");
      },
      error: (e: any) => this.toastr.error("order not submitted")
    })
  }
    displayColums: string[] = ["name", "description", "price","action"]
}
