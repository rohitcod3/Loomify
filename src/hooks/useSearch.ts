import { useEffect, useState } from "react"
import { useQueryData } from "./useQueryData"
import { searchUsers } from "@/actions/user"
import { getWorkspaceFolders, getWorkspaces } from "@/actions/workspace"

export const useSearch = (
  key: string,
  type: 'USERS' | 'WORKSPACE' | 'FOLDERS'
) => {
  const [query, setQuery] = useState('');
  const [debounce, setDebounce] = useState('');
  const [onUsers, setOnUsers] = useState<
    {
      id: string;
      subscription: {
        plan: 'PRO' | 'FREE';
      } | null;
      firstname: string | null;
      lastname: string | null;
      image: string | null;
      email: string | null;
    }[]
  >([]); 

  const [workspaceId, setWorkspaceId] = useState('');
  const [results, setResults] = useState<any[] | undefined>(undefined); 

  const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebounce(query);
    }, 100);
    return () => clearTimeout(delayInputTimeoutId);
  }, [query]);

  useEffect(() => {
    if (type !== 'FOLDERS') setWorkspaceId('');
  }, [type]);

  const { refetch, isFetching } = useQueryData(
    [key, debounce],
    async ({ queryKey }) => {
      const searchTerm = queryKey[1] as string || '';

      if (type === 'USERS') {
        const users = await searchUsers(searchTerm);
        if (users.status === 200) {
          setOnUsers(users.data);
          return users.data;
        } else {
          setOnUsers([]);
          return [];
        }
      }

      if (type === 'WORKSPACE') {
        const workspaces = await getWorkspaces();
        if (
          workspaces?.status === 200 &&
          Array.isArray(workspaces.data?.WorkSpace)
        ) {
          setResults(workspaces.data.WorkSpace);
          return workspaces.data.WorkSpace;
        } else {
          setResults([]);
          return [];
        }
      }

      if (type === 'FOLDERS') {
        let currentWorkspaceId = workspaceId;

        if (!currentWorkspaceId) {
          const workspace = await getWorkspaceFolders(currentWorkspaceId);
          currentWorkspaceId =
            Array.isArray(workspace?.data) && workspace.data.length > 0
              ? workspace.data[0].workSpaceId || ''
              : '';
          setWorkspaceId(currentWorkspaceId);
        }

        const folders = await getWorkspaceFolders(currentWorkspaceId);
        if (folders?.status === 200 && Array.isArray(folders.data)) {
          setResults(folders.data);
          return folders.data;
        } else {
          setResults([]);
          return [];
        }
      }

      
      return [];
    },
    false
  );

  useEffect(() => {
    refetch(); 
  }, [debounce]);

  return { onSearchQuery, query, isFetching, onUsers, results };
};
