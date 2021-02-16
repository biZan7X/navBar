import react, { useEffect, useState } from "react";

const GoogleAuth = () => {
	//^ component did mount
	useEffect(() => {
		window.gapi.load("client:auth2", () => {
			window.gapi.client
				.init({
					clientId:
						"937678077252-nniq1aj81allool3nplesq9u0queqs6b.apps.googleusercontent.com",
					scope: "email",
				})
				.then(() => {
					const auth = window.gapi.auth2.getAuthInstance();
					setIsSignedIn(auth.isSignedIn.get());
				});
		});
	}, []);

	const [isSignedIn, setIsSignedIn] = useState(null);

	const renderAuth = () => {
		if (isSignedIn === null) return <div>i dunno if we are signed in</div>;
		else if (isSignedIn) return <div>we are signed in boss</div>;
		else return <div>we are not signed in</div>;
	};

	return <div>{renderAuth()}</div>;
};

export default GoogleAuth;
