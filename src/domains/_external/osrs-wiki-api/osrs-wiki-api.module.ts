import { Module } from '@nestjs/common';
import { OsrsWikiApiService } from './osrs-wiki-api.service';
import { HttpModule } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { OsrsContentSerializers } from './serializers/osrs-content.serializers';

@Module({
  imports: [HttpModule],
  providers: [OsrsWikiApiService, OsrsContentSerializers],
  exports: [OsrsWikiApiService],
})
export class OsrsWikiApiModule {}
