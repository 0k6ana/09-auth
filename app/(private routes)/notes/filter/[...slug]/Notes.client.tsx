'use client';

import css from './page.module.css';

import { type FetchTagNote } from '@/types/note';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchNotes } from '@/lib/api/clientApi';
import { useDebouncedCallback } from 'use-debounce';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';

interface NotesClientProps {
  tag?: FetchTagNote;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [word, setWord] = useState<string>('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', tag, page, word],
    queryFn: () =>
      fetchNotes({
        tag,
        page,
        search: word,
      }),
    placeholderData: keepPreviousData,
  });

  const handleCreateNavigation = (): void => {
    router.push('/notes/action/create');
  };

  const changeWord = useDebouncedCallback((newWord: string): void => {
    setPage(1);
    setWord(newWord);
  }, 500);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  return (
    <div className={css.notes}>
      <div className={css.toolbar}>
        <SearchBox changeWord={changeWord} />

        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            setPage={setPage}
          />
        )}

        <button
          className={css.toolBtn}
          onClick={handleCreateNavigation}
        >
          Create note +
        </button>
      </div>

      {data && data.notes.length > 0 && (
        <NoteList noteList={data.notes} />
      )}

      {data && data.notes.length === 0 && <p>No notes found</p>}
    </div>
  );
}