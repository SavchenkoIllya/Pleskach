import { getPaginatedPosts } from "@/app/lib/action";
import { Posts } from "@/app/lib/definitions";
import { Message } from "@/app/ui/dashboard/message";
import CustomPagination from "@/app/ui/dashboard/pagination-core";

type PaginatedPosts = {
  totalPages: number;
  data: Posts[];
};

export default async function Posts(req: { params: { pageNumber: number } }) {
  const page = Number(req.params.pageNumber) || 1;
  const paginatedPosts = await getPaginatedPosts(page);
  const posts = paginatedPosts.data as Posts[];
  const totalContent = paginatedPosts.totalContent;
  const contentOnPage = paginatedPosts.contentOnPage;

  const handleNavigation = (e: any) => {
    if (e) console.log(e);
  };

  return (
    <div className="p-4 flex flex-col justify-between items-center h-[100%]">
      <div className="flex justify-center items-center gap-4 flex-col">
        {posts.map((el: any) => {
          return (
            <Message
              key={el.id}
              id={el.id}
              name={el.name}
              telephone={el.telephone}
              problem={el.problem}
              is_read={el.is_read}
              date={el.date}
            />
          );
        })}
      </div>
      <CustomPagination
        className="my-8"
        totalCount={totalContent}
        pageSize={contentOnPage}

        // for test cases
        // totalCount={100}
        // pageSize={5}
        
        currentPage={page}
      />
    </div>
  );
}