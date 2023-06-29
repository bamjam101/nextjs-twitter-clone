import getCurrentUser from "@/app/actions/getCurrentUser";
import FormState from "./FormState";
import { User } from "@prisma/client";

const Form = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      <FormState
        currentUser={currentUser as User}
        placeholder={"What's happening?"}
      />
    </div>
  );
};

export default Form;
