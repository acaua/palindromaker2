import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="">
      {session ? (
        <>
          Signed in as{" "}
          {
            // @ts-ignore
            session?.user.username
          }
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <button onClick={() => signIn("twitter")}>Sign in</button>
      )}
    </header>
  );
}
