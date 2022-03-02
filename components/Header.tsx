import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="">
      {session ? (
        <>
          Signed in as {JSON.stringify(session, null, 2)} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          Not signed in <br />
          <button onClick={() => signIn("twitter")}>Sign in</button>
        </>
      )}
    </header>
  );
}
