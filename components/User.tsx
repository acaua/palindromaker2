import Link from "next/link";

import { UserType } from "@/model/User";

type UserProps = {
  user: UserType;
};

export default function User({ user }: UserProps) {
  return (
    <div>
      <Link href={`/${user.username}`}>
        <a>
          <h2>{user.username}</h2>
        </a>
      </Link>
      <p>{JSON.stringify(user, null, 2)}</p>
    </div>
  );
}
