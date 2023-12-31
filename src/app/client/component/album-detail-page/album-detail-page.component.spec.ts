import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumDetailPageComponent } from './album-detail-page.component';

describe('AlbumDetailPageComponent', () => {
  let component: AlbumDetailPageComponent;
  let fixture: ComponentFixture<AlbumDetailPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlbumDetailPageComponent]
    });
    fixture = TestBed.createComponent(AlbumDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
