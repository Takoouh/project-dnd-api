import { Module } from '@nestjs/common';
import { OsrsWikiApiService } from './osrs-wiki-api.service';
import { HttpModule } from '@nestjs/axios';
import { Observable } from 'rxjs';

@Module({
  imports: [HttpModule],
  providers: [OsrsWikiApiService],
  exports: [OsrsWikiApiService],
})
export class OsrsWikiApiModule {}
