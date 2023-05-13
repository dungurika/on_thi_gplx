import { Test, TestingModule } from '@nestjs/testing';
import { TrafficSignsController } from './traffic-signs.controller';
import { TrafficSignsService } from '../TrafficSignsService/traffic-signs.service';

describe('TrafficSignsController', () => {
  let controller: TrafficSignsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrafficSignsController],
      providers: [TrafficSignsService],
    }).compile();

    controller = module.get<TrafficSignsController>(TrafficSignsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
