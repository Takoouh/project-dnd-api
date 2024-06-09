import { OsrsApiQueryResponse } from './osrs-api-query-response.type';

export type GetPagesApiResponse = OsrsApiQueryResponse<{
  pages: {
    pageid: number;
    ns: number;
    title: string;
    revisions: { slots: { main: { content: string } } }[];
  }[];
}>;
