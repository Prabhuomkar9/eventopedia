import EmailSignIn from "~/components/signIn/emailSignIn";
import GithubSignIn from "~/components/signIn/githubSignIn";
import GoogleSignIn from "~/components/signIn/googleSignIn";
import { NextPage } from "next";

const LogIn: NextPage = () => {
  return (
    <div className="w-full flex flex—col justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-4xl font-extrabold">Sign In</h1>
        <div className="flex flex-col justify-center items-center gap-3">
          <GoogleSignIn />
          {/* <GithubSignIn /> */}
        </div>
        {/* <span className="text-2xl font-semibold text-white text-center">
          Or
        </span>
        <EmailSignIn /> */}
      </div>
    </div>
  );
};

export default LogIn;
