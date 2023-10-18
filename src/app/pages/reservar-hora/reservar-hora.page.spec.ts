import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservarHoraPage } from './reservar-hora.page';

describe('ReservarHoraPage', () => {
  let component: ReservarHoraPage;
  let fixture: ComponentFixture<ReservarHoraPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReservarHoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
