import { auth } from "@/auth";

export default async function UserInfo() {
  const session = await auth();

  //   console.log(session);
  return <div></div>;
}
