// import { getPaginatedPosts } from "@/app/lib/action";
// import { IPosts } from "@/app/lib/definitions";
import { Message } from "@/app/ui/dashboard/message";
import CustomPagination from "@/app/ui/dashboard/pagination-core";
import { Suspense } from "react";
// import clsx from "clsx";
import { PostSkeleton } from "@/app/ui/suspense/posts-suspence";
import { IPaginatedPosts, getPaginatedPosts } from "@/app/lib/Posts.service";

export default async function Posts(req: { params: { pageNumber: number } }) {
  const page = Number(req.params.pageNumber) || 1;
  const paginatedPosts: IPaginatedPosts = (await getPaginatedPosts(
    1,
  )) as IPaginatedPosts;
  // console.log(paginatedPosts);

  const posts = paginatedPosts.data;

  const totalContent = paginatedPosts.totalContent;
  const contentOnPage = paginatedPosts.contentOnPage;

  // const handleNavigation = (e: any) => {
  //   if (e) console.log(e);
  // };

  return (
    <div className="flex flex-col items-center justify-between p-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <Suspense fallback={<PostSkeleton />}>
          {posts?.map(({ id, name, telephone, problem, is_read, date }) => {
            return (
              <Message
                page={page}
                key={id}
                id={id}
                name={name}
                telephone={telephone}
                problem={problem}
                is_read={is_read}
                date={ date}
              />
            );
          })}
        </Suspense>
      </div>
      <Suspense>
        {posts && (
          <CustomPagination
            className="my-8"
            totalCount={totalContent}
            pageSize={contentOnPage}
            currentPage={page}
          />
        )}
      </Suspense>
    </div>
  );
}
