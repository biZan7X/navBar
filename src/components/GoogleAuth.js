import react, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { signIN, signOUT } from "../actions";

const GoogleAuth = (props) => {
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
					onAuthChange();
					auth.isSignedIn.listen(onAuthChange);
				});
		});
	}, []);

	const onAuthChange = () => {
		const auth = window.gapi.auth2.getAuthInstance();
		if (auth.isSignedIn.get()) props.signIN();
		else props.signOUT();
	};

	const onSignInClick = () => {
		const auth = window.gapi.auth2.getAuthInstance();
		auth.signIn();
	};

	const onSignOutClick = () => {
		const auth = window.gapi.auth2.getAuthInstance();
		auth.signOut();
	};

	const renderAuth = () => {
		if (props.isSignedIn === null) return null;
		else if (props.isSignedIn)
			return (
				<div onClick={onSignOutClick} className="ui red google button">
					<i className="google icon" />
					Sign Out
				</div>
			);
		else
			return (
				<div onClick={onSignInClick} className="ui green google button">
					<i className="google icon" />
					Sign In
				</div>
			);
	};

	return <div>{renderAuth()}</div>;
};

const mapStateToProp = (state) => {
	return { isSignedIn: state.auth.isSignedIn }; //* we want the object of auth reducer
};

export default connect(mapStateToProp, { signIN, signOUT })(GoogleAuth);
