import React, { useState } from "react";

function Login() {
	//checkbox state
	let [checkboxCheck, setCheckboxCheck] = useState(false);

	return (
		<div className="auth-bounder">
			<div className="worldclass-welcome">
				<h2>Begin your FOSHA journey today</h2>
				<p>FoSha is house of wonderful chefs</p>
			</div>

			<div className="sso-authority">
				<button className="google">Continue with Google</button>
				<button className="apple">Continue with Apple</button>
				<button className="twitter">Continue with Twitter</button>
			</div>

			<div className="sso-emails">
				<div className="separator">
					<span>Continue with email and password</span>
				</div>
				<form method="GET" url="http:localhost:3004/users">
					<div class="crayons-field mb-3">
						<label class="crayons-field__label" for="user_email">
							Email
						</label>
						<input
							autocomplete="email"
							class="crayons-textfield"
							type="email"
							name="user[email]"
							id="user_email"
							required
						/>
					</div>

					<div class="crayons-field mb-3">
						<label class="crayons-field__label" for="user_password">
							Password
						</label>
						<input
							autocomplete="current-password"
							class="crayons-textfield"
							type="password"
							name="user[password]"
							id="user_password"
							required
						/>
					</div>

					<div class="crayons-field-bot">
						<input
							class="crayons-checkbox"
							type="checkbox"
							value="1"
							checked={checkboxCheck ? "checked" : ""}
							name="user[remember_me]"
							id="user_remember_me"
							onClick={() => setCheckboxCheck(!checkboxCheck)}
						/>
						<label
							class="crayons-field__label fw-normal"
							for="user_remember_me"
						>
							Remember me
						</label>
					</div>

					<div class="actions pt-3">
						<input
							type="submit"
							name="commit"
							value="Continue"
							class="crayons-btn crayons-btn--l w-100"
							data-disable-with="Continue"
						/>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
