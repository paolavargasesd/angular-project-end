import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Product } from './../../../types/index';

@Component({
  selector: 'app-Admin',
  templateUrl: './Admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public productForm: FormGroup;
	public submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      price: ['', [Validators.required, Validators.maxLength(20)]],
      description: [''],
      image: [''],
      category: [''],
    });
  }

  ngOnInit(): void {
  }
  public onSubmit(): void {
    this.submitted = true;
    if (this.productForm.valid) {
      
      const product: Product = {
        title: this.productForm.get('title')?.value || "",
        price: this.productForm.get('price')?.value || "",
        description: this.productForm.get('description')?.value || "",
        image: this.productForm.get('image')?.value || "",
        category: this.productForm.get('category')?.value || "",
      };
      fetch('https://fakestoreapi.com/products',{
            method:"POST",
            body:JSON.stringify(product)
        })
            .then(res=>res.json())
            .then(json=> {
              console.log(json)
              this.productForm.reset();
              this.submitted = false;
            })

      
    }
  }

}
