import { Module } from '@nestjs/common';
import { HandleErrors } from './@services/handle-errors.service';

@Module({
    providers: [HandleErrors],
    exports: [HandleErrors]
})
export class CommonModule {}
