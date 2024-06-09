import { OsrsApiQueryResponse } from './osrs-api-query-response.type';

export type GetCategoryMembersApiResponse = OsrsApiQueryResponse<{
  categorymembers: { pageid: number; ns: number; title: string }[];
}>;
