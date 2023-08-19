import React, { useState, useEffect } from "react";

function PWAInstallButton() {
	const [installPrompt, setInstallPrompt] = useState(null);

	useEffect(() => {
		// Capture the event when it's fired
		const beforeInstallPromptHandler = (e) => {
			// Prevent the automatic prompt
			e.preventDefault();
			// Store the event for triggering it later
			setInstallPrompt(e);
		};

		window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);

		return () => {
			window.removeEventListener(
				"beforeinstallprompt",
				beforeInstallPromptHandler
			);
		};
	}, []);

	const handleInstallClick = () => {
		console.log(installPrompt, "installPrompt");
		if (!installPrompt) return;

		// Show the installation prompt to the user
		installPrompt.prompt();

		// Check the user's decision
		installPrompt.userChoice.then((choiceResult) => {
			if (choiceResult.outcome === "accepted") {
				console.log("User accepted the install prompt");
			} else {
				console.log("User dismissed the install prompt");
			}
			// Clear the saved event
			setInstallPrompt(null);
		});
	};

	return (
		<div className={installPrompt ? "mx-auto text-center my-3" : null}>
			{installPrompt ? (
				<button
					className='btn btn-info'
					onClick={handleInstallClick}
					disabled={!installPrompt}
				>
					Download App
				</button>
			) : null}
		</div>
	);
}

export default PWAInstallButton;
