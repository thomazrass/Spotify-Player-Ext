
document.addEventListener("DOMContentLoaded", () => {
  const clientID = "653bdaeff88a4fb9a3468455c31e6143";
  const redirectURI = `https://giiigaedoegbgmgoghnllnkdaepalhpd.chromiumapp.org/callback`;
  const scopes = "user-read-private user-read-email";

  document.getElementById("btn").addEventListener("click", () => {
    const authURL = `https://accounts.spotify.com/authorize` +
      `?response_type=token` +
      `&client_id=${clientID}` +
      `&redirect_uri=${encodeURIComponent(redirectURI)}` +
      `&scope=${encodeURIComponent(scopes)}`;

    chrome.identity.launchWebAuthFlow(
      {
        url: authURL,
        interactive: true
      },
      function (redirectUrl) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }

        console.log("Redirect URL:", redirectUrl);
        const url = new URL(redirectUrl);
        console.log("Hash fragment:", url.hash);
        const params = new URLSearchParams(url.hash.substring(1));
        const accessToken = params.get("access_token");


        if (accessToken) {
          console.log("Spotify Access Token:", accessToken);
        } else {
          console.error("Access token not found.");
        }
      }
    );
  });
});
