import React from "react";

function Register() {
	return (
		<div className="auth-bounder">
			<div className="worldclass-welcome">
				<h2>Begin your FOSHA journey today</h2>
				<p>FoSha is house of wonderful chefs</p>
			</div>

			<div className="sso-authority">
				<button className="google">Sign up with Google</button>
				<button className="apple">Sign up with Apple</button>
				<button className="twitter">Sign up with Twitter</button>
			</div>

			<div className="sso-emails">
				<div className="separator">
					<span>Sign up with email and password</span>
				</div>
				<form>
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
						/>
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

export default Register;
