import { Button } from "../../ui/button";
import { LoginForm } from "../../ui/login-form";

export default function SignIn() {

  return (
    <section className="min-h-[100dvh] flex">
      {/* <form className="m-auto flex flex-col gap-4 items-end">
        <div>
          <label className="mr-4">E-mail</label>
          <input />
        </div>
        <div>
          <label className="mr-4">Password</label>
          <input />
        </div>
        <Button className="self-center">Post</Button>
      </form> */}
      <LoginForm/>
    </section>
  );
}
