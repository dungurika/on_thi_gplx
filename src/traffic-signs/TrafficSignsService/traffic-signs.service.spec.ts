import { Test, TestingModule } from '@nestjs/testing';
import { TrafficSignsService } from './traffic-signs.service';

describe('TrafficSignsService', () => {
  let service: TrafficSignsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrafficSignsService],
    }).compile();

    service = module.get<TrafficSignsService>(TrafficSignsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
