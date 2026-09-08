# TanStack Query modules

One module per endpoint. Each exports the fetcher, the query options (or the mutation hook), the key factory, and the param and response types.

## Query

```tsx
type GetUserResponse = { id: string; name: string; email: string };

type GetUserParams = { id: string; signal?: AbortSignal };

function getUser({ id, signal }: GetUserParams) {
  return api.get<GetUserResponse>(`users/${id}`, { signal }).json();
}

const getUserQueryKeys = {
  all: ["GetUserAll"] as const,
  details: () => [...getUserQueryKeys.all, "details"] as const,
  detail: (params: GetUserParams) =>
    [...getUserQueryKeys.details(), params] as const,
};

function getUserQueryOptions(params: GetUserParams) {
  return queryOptions({
    queryKey: getUserQueryKeys.detail(params),
    queryFn: ({ signal }) => getUser({ ...params, signal }),
  });
}

// Only if needed, this example is written with limit and offset
function getUserInfiniteQueryOptions({
  limit = 10,
  offset = 0,
  ...params
}: GetUserParams = {}) {
  return infiniteQueryOptions({
    queryKey: getBlogsSubjectsQueryKeys.detail(params),
    queryFn: ({ signal, pageParam: { limit, offset } }) =>
      getBlogsSubjects({ signal, ...params, limit, offset }),
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return getNextPaginationState({
        count: lastPage.count,
        limit,
        offset: lastPageParam.offset,
      });
    },
    initialPageParam: { offset, limit },
  });
}

export {
  getUser,
  getUserQueryOptions,
  getUserQueryKeys,
  type GetUserParams,
  type GetUserResponse,
};
```

a utility example for handling limit and offset `@/utils/getNextPaginationState.ts`

```tsx
type GetNextPaginationStateParams = {
  count: PaginationResponse<unknown>["count"];
} & Required<PaginationParams>;

function getNextPaginationState({
  count,
  limit,
  offset,
}: GetNextPaginationStateParams) {
  const remaining = count - offset;

  // If the total count is less than or equal to the page limit,
  // everything fits on the first page → no next page.
  if (count <= limit) return undefined;

  // If no items remain to be fetched, also no next page.
  if (remaining <= 0) return undefined;

  // Otherwise, calculate the next offset:
  // Advance by at most {limit} items (but never beyond the remaining count),
  // keep the same limit.
  return {
    offset: offset + Math.min(limit, remaining),
    limit: limit,
  };
}
```

An endpoint with no parameters keeps the same shape with the key factory cut to `all`, and `signal` as the only param:

```tsx
type GetUserParams = { signal?: AbortSignal };

const getUserQueryKeys = { all: ["GetUserAll"] as const };

function getUserQueryOptions() {
  return queryOptions({
    queryKey: getUserQueryKeys.all,
    queryFn: ({ signal }) => getUser({ signal }),
  });
}
```

## Mutation

```tsx
type CreateUserResponse = {};

type CreateUserParams = {};

function createUser({}: CreateUserParams) {
  return api.post<CreateUserResponse>(`users`, {}).json();
}

function useCreateUser() {
  return useMutation({ mutationFn: createUser });
}

export {
  createUser,
  useCreateUser,
  type CreateUserParams,
  type CreateUserResponse,
};
```
