import SnippetsPagination from '@/components/pagination';
import PaginationSkeleton from '@/components/skeleton/pagination';
import SnippetListSkeleton from '@/components/skeleton/snippet-list';
import SnippetList from '@/components/snippets/snippet-list';
import { Suspense } from 'react';
import { getSnippetList, getPagination } from '@/services';
import FilterOptionsSkeleton from '@/components/skeleton/filter-snippets';
import FilterOptions from '@/components/snippets/filter-options';

export default async function MainPage({
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ title?: string; language?: string; page?: string }>;
}) {
  const { title = '', language = '', page = '1' } = await searchParams;

  const snippetList = getSnippetList({
    title,
    language,
    page: Number(page),
  });

  const pagination = getPagination({
    title,
    language,
  });

  return (
    <>
      <Suspense fallback={<FilterOptionsSkeleton />}>
        <FilterOptions />
      </Suspense>

      <Suspense fallback={<SnippetListSkeleton />}>
        <SnippetList snippetListRequest={snippetList} />
      </Suspense>

      <Suspense fallback={<PaginationSkeleton />}>
        <SnippetsPagination totalPagesRequest={pagination} />
      </Suspense>
    </>
  );
}
