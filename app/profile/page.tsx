import UpdateButton from "../components/updateButton";
import { updateUser } from "../lib/actions";
import { wixClientServer } from "../lib/wixClientServer";

const ProfilePage = async() => {
 const wixClient = await wixClientServer();

  const user = await wixClient.members.getCurrentMember();

  if (!user.member?.contactId) {
    return <div className="mt-14 w-[90vw] m-auto flex flex-col items-center">Not logged in!</div>;
  }

  return (
    <div className="mt-14 w-[90vw] m-auto flex flex-col items-center">
     <div className="w-full">
        <h1 className="text-2xl">Profile</h1>
        <form action={updateUser} className="mt-12 flex flex-col gap-4">
          <input type="text" hidden name="id" value={user.member.contactId} readOnly />
          <label className="text-sm text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            placeholder={user.member?.profile?.nickname || "john"}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder={user.member?.contact?.firstName || "John"}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700">Surname</label>
          <input
            type="text"
            name="lastName"
            placeholder={user.member?.contact?.lastName || "Doe"}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder={
              (user.member?.contact?.phones &&
                user.member?.contact?.phones[0]) ||
              "+1234567"
            }
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <label className="text-sm text-gray-700">E-mail</label>
          <input
            type="email"
            name="email"
            placeholder={user.member?.loginEmail || "john@gmail.com"}
            className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
          />
          <UpdateButton />
        </form>
      </div>
    </div>
  )
}

export default ProfilePage