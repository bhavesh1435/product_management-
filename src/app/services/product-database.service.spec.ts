import { TestBed } from '@angular/core/testing';

import { ProductDatabaseService } from './product-database.service';

describe('ProductDatabaseService', () => {
  let service: ProductDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
