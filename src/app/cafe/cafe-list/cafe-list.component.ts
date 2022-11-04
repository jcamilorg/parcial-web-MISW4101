import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import { Cafe } from '../cafe';
import { CafeService } from '../cafe.service';

@Component({
  selector: 'app-cafe-list',
  templateUrl: './cafe-list.component.html',
  styleUrls: ['./cafe-list.component.css'],
})
export class CafeListComponent implements OnInit {
  cafes: Array<Cafe> = [];
  cafeOrigen: number = 0;
  cafeBlend: number = 0;

  constructor(private cafeService: CafeService) {}

  ngOnInit() {
    this.getCafes();
  }

  getCafes(): void {
    this.cafeService.getCafes().subscribe((cafes) => {
      console.log(cafes);
      this.cafes = cafes;
      this.getType();
    });
  }

  getType(): void {
    this.cafes.forEach((cafe) => {
      if (cafe.tipo === 'Café de Origen') {
        this.cafeOrigen++;
      } else if (cafe.tipo === 'Blend') {
        this.cafeBlend++;
      }
    });
  }
}
