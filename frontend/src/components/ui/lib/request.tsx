import { fetcherWithAuth, postWithAuth } from "@/api/fetcher";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { Button } from "../button";
import { useSnackbar } from "notistack";

function RequestNotif({ request }) {
  const { enqueueSnackbar } = useSnackbar();
  const { data: user, isLoading } = useSWR(
    `/api/users/${request.userId}`,
    fetcherWithAuth
  );
  const { trigger: acceptTrigger } = useSWRMutation(
    `/api/accept_request/${request.requestId}`,
    postWithAuth
  );
  const { trigger: rejectTrigger } = useSWRMutation(
    `/api/reject_request/${request.requestId}`,
    postWithAuth
  );

  const handleAccept = async () => {
    await acceptTrigger({});
    enqueueSnackbar("Request accepted!", { variant: "success" });
  };

  const handleReject = async () => {
    await rejectTrigger({});
    enqueueSnackbar("Request rejected!", { variant: "success" });
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="flex gap-3">
      <div>New Request from user {user.name} to join your group!</div>
      <Button onClick={handleAccept}>Accept</Button>
      <Button onClick={handleReject}>Reject</Button>
    </div>
  );
}

export default RequestNotif;
