import { emitError } from "@eliasrrosa/react-ui";
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

export const getQueryClient = () => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 5,
      },
    },

    queryCache: new QueryCache({
      onError: (err) => {
        emitError({
          message: err.message
        })
      }
    }),
    
    mutationCache: new MutationCache({
      onError: (err) => {
        emitError({
          message: err.message
        })
      }
    })
  });