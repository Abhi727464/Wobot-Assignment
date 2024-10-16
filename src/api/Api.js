const API_URL = "https://api-app-staging.wobot.ai/app/v1/fetch/cameras";
const STATUS_API_URL =
  "https://api-app-staging.wobot.ai/app/v1/update/camera/status";
const TOKEN = "Bearer 4ApVMIn5sTxeW7GQ5VWeWiy";

export const fetchCameras = async () => {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: TOKEN,
    },
  });
  const data = await response.json();

  return data.data; // Assuming the API returns an array of cameras in this format.
};

export const updateCameraStatus = async (id, status) => {
  const response = await fetch(STATUS_API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: TOKEN,
    },
    body: JSON.stringify({ id, status }),
  });
  return response.ok;
};
