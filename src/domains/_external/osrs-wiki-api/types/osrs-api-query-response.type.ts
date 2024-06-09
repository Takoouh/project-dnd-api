export type OsrsApiQueryResponse<T> = {
  batchcomplete: boolean;
  continue: {
    cmcontinue: string;
    continue: string;
  };
  query: T;
};
