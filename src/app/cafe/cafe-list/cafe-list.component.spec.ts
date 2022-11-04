/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CafeListComponent } from './cafe-list.component';
import { Cafe } from '../cafe';
import { faker } from '@faker-js/faker';

describe('CafeListComponent', () => {
  let component: CafeListComponent;
  let fixture: ComponentFixture<CafeListComponent>;
  let debug: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [CafeListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CafeListComponent);
    component = fixture.componentInstance;

    for (let i = 0; i < 3; i++) {
      const cafe = new Cafe(
        faker.datatype.number(),
        faker.datatype.string(),
        faker.datatype.string(),
        faker.datatype.string(),
        faker.datatype.string(),
        faker.datatype.number(),
        faker.image.food()
      );

      component.cafes.push(cafe);
    }
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a tr inside the thead element', () => {
    expect(debug.queryAll(By.css('thead tr'))).toHaveSize(1);
  });

  it('should have a th in thead with text # Nombre Tipo Region', () => {
    const titles = ['#', 'Nombre', 'Tipo', 'Region'];

    const childre = debug.query(By.css('thead tr')).children;
    childre.forEach((th, i) => {
      expect(th.nativeElement.textContent).toContain(titles[i]);
    });
  });

  it('should create 3 tr elemenst corresponding to the three coffies', () => {
    const bodyTable = debug.query(By.css('tbody'));
    expect(bodyTable.children).toHaveSize(3);
  });

  it('should th element content the id', () => {
    debug.queryAll(By.css('th[scope="row"]')).forEach((th, i) => {
      expect(th.nativeElement.textContent).toContain(component.cafes[i].id);
    });
  });

  it('should th in tbody contain the id, nombre, Tipo, Region of a coffie', () => {
    debug.queryAll(By.css('tbody tr')).forEach((tr, i) => {
      const children = tr.children;
      expect(children[0].nativeElement.textContent).toContain(
        component.cafes[i].id
      );
      expect(children[1].nativeElement.textContent).toContain(
        component.cafes[i].nombre
      );
      expect(children[2].nativeElement.textContent).toContain(
        component.cafes[i].tipo
      );
      expect(children[3].nativeElement.textContent).toContain(
        component.cafes[i].region
      );
    });
  });

  it('should have 2 p elements with the variables CafeOrigen and cafe Blend', () => {
    const ptags = debug.queryAll(By.css('p'));

    expect(ptags[0].nativeElement.textContent).toContain(
      `Total café de origen: ${component.cafeOrigen}`
    );
    expect(ptags[1].nativeElement.textContent).toContain(
      `Total café blend: ${component.cafeBlend}`
    );
  });

  it('should have img element', () => {
    expect(debug.queryAll(By.css('img'))).toHaveSize(1);
  });
});
