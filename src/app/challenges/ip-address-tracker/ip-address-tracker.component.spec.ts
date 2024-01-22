import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpAddressTrackerComponent } from './ip-address-tracker.component';

describe('IpAddressTrackerComponent', () => {
  let component: IpAddressTrackerComponent;
  let fixture: ComponentFixture<IpAddressTrackerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IpAddressTrackerComponent]
    });
    fixture = TestBed.createComponent(IpAddressTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
