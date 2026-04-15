import { useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import "./login.css";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n } = props;

    const {
        social,
        realm,
        url,
        usernameHidden,
        login,
        auth,
        messagesPerField,
        message
    } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
    const [isPasswordRevealed, setIsPasswordRevealed] = useState(false);

    const hasUsernameError = messagesPerField.existsError("username", "password");
    const hasPasswordError = messagesPerField.existsError("password");

    return (
        <div className="authentication-wrapper authentication-cover">
            <div className="authentication-inner">
                {/* ── Left: Banner ─────────────────────────────────── */}
                <div className="auth-banner-col">
                    <div className="banner-wrapper">
                        <div className="banner-header">
                            <img
                                src="/assets/images/logos/logo-market-light.svg"
                                alt="MarketConnector"
                                className="logo-img"
                            />
                        </div>

                        <div className="banner-content animate-fade-in">
                            <span className="banner-badge">Integração inteligente</span>
                            <h1>
                                Conecte seus ERPs <br />
                                a múltiplos marketplaces
                            </h1>
                            <p>
                                Centralize pedidos, estoque e faturamento em uma única plataforma.
                                Mais controle, menos retrabalho.
                            </p>
                            <div className="banner-features">
                                <div>Sincronização em tempo real</div>
                                <div>Monitoramento de eventos</div>
                                <div>Escalável e confiável</div>
                            </div>
                        </div>

                        <div className="banner-footer">© 2026 MarketConnector</div>
                    </div>
                </div>

                {/* ── Right: Form ───────────────────────────────────── */}
                <div className="auth-form-col">
                    <div className="auth-form-inner animate-fade-in">
                        {/* Logo — visible only on mobile (banner hidden) */}
                        <div className="mobile-logo">
                            <img
                                src="/assets/images/logos/logo-market.svg"
                                alt="MarketConnector"
                            />
                        </div>

                        <h4>Bem-vindo de volta</h4>
                        <p>Acesse sua conta para continuar</p>

                        {/* Global message (error/warning/info from Keycloak) */}
                        {message !== undefined &&
                            !messagesPerField.existsError("username", "password") && (
                                <div
                                    className={`alert alert-${message.type}`}
                                    dangerouslySetInnerHTML={{
                                        __html: kcSanitize(message.summary)
                                    }}
                                />
                            )}

                        {realm.password && (
                            <form
                                id="kc-form-login"
                                onSubmit={() => {
                                    setIsLoginButtonDisabled(true);
                                    return true;
                                }}
                                action={url.loginAction}
                                method="post"
                            >
                                {/* Username / E-mail */}
                                {!usernameHidden && (
                                    <div className="form-group">
                                        <label htmlFor="username">
                                            {!realm.loginWithEmailAllowed
                                                ? "Usuário"
                                                : !realm.registrationEmailAsUsername
                                                    ? "Usuário ou E-mail"
                                                    : "E-mail"}
                                        </label>
                                        <input
                                            tabIndex={2}
                                            id="username"
                                            className={`form-control${hasUsernameError ? " is-invalid" : ""}`}
                                            name="username"
                                            defaultValue={login.username ?? ""}
                                            type="text"
                                            autoFocus
                                            autoComplete="username"
                                            aria-invalid={hasUsernameError}
                                        />
                                        {hasUsernameError && (
                                            <span
                                                id="input-error-username"
                                                className="invalid-feedback"
                                                aria-live="polite"
                                                dangerouslySetInnerHTML={{
                                                    __html: kcSanitize(
                                                        messagesPerField.getFirstError(
                                                            "username",
                                                            "password"
                                                        )
                                                    )
                                                }}
                                            />
                                        )}
                                    </div>
                                )}

                                {/* Password */}
                                <div className="form-group">
                                    <label htmlFor="password">Senha</label>
                                    <div className="input-group">
                                        <input
                                            tabIndex={3}
                                            id="password"
                                            className={`form-control${hasPasswordError && usernameHidden ? " is-invalid" : ""}`}
                                            name="password"
                                            type={isPasswordRevealed ? "text" : "password"}
                                            autoComplete="current-password"
                                            aria-invalid={hasPasswordError}
                                        />
                                        <button
                                            type="button"
                                            className="input-group-text"
                                            aria-label={
                                                isPasswordRevealed
                                                    ? msgStr("hidePassword")
                                                    : msgStr("showPassword")
                                            }
                                            aria-controls="password"
                                            onClick={() => setIsPasswordRevealed(v => !v)}
                                        >
                                            {isPasswordRevealed ? (
                                                /* eye-off icon */
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                                    <line x1="1" y1="1" x2="23" y2="23" />
                                                </svg>
                                            ) : (
                                                /* eye icon */
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {usernameHidden && hasPasswordError && (
                                        <span
                                            id="input-error-password"
                                            className="invalid-feedback"
                                            aria-live="polite"
                                            dangerouslySetInnerHTML={{
                                                __html: kcSanitize(
                                                    messagesPerField.getFirstError(
                                                        "username",
                                                        "password"
                                                    )
                                                )
                                            }}
                                        />
                                    )}
                                </div>

                                {/* Remember Me + Forgot Password */}
                                <div className="form-options-row">
                                    {realm.rememberMe && !usernameHidden ? (
                                        <label className="form-check" htmlFor="rememberMe">
                                            <input
                                                tabIndex={5}
                                                id="rememberMe"
                                                name="rememberMe"
                                                type="checkbox"
                                                defaultChecked={!!login.rememberMe}
                                            />
                                            Lembrar
                                        </label>
                                    ) : (
                                        <span />
                                    )}

                                    {realm.resetPasswordAllowed && (
                                        <a
                                            tabIndex={6}
                                            href={url.loginResetCredentialsUrl}
                                            className="forgot-link"
                                        >
                                            Esqueci minha senha
                                        </a>
                                    )}
                                </div>

                                {/* Hidden credential id */}
                                <input
                                    type="hidden"
                                    id="id-hidden-input"
                                    name="credentialId"
                                    value={auth.selectedCredential}
                                />

                                {/* Submit */}
                                <button
                                    tabIndex={7}
                                    id="kc-login"
                                    type="submit"
                                    disabled={isLoginButtonDisabled}
                                    className="btn-login"
                                >
                                    ENTRAR
                                </button>
                            </form>
                        )}

                        {/* Social providers */}
                        {realm.password &&
                            social?.providers !== undefined &&
                            social.providers.length > 0 && (
                                <div id="kc-social-providers">
                                    <div className="social-login-separator">
                                        {msg("identity-provider-login-label")}
                                    </div>
                                    <ul className="social-providers-list">
                                        {social.providers.map(p => (
                                            <li key={p.alias}>
                                                <a
                                                    id={`social-${p.alias}`}
                                                    href={p.loginUrl}
                                                    className="social-provider-btn"
                                                    title={p.displayName}
                                                >
                                                    {p.iconClasses && (
                                                        <i className={p.iconClasses} aria-hidden="true" />
                                                    )}
                                                    {(social.providers?.length ?? 0) <= 3 && (
                                                        <span
                                                            className="social-provider-name"
                                                            dangerouslySetInnerHTML={{
                                                                __html: kcSanitize(p.displayName)
                                                            }}
                                                        />
                                                    )}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        {/* Contact / Registration link */}
                        <p className="auth-register-link">
                            <span>Novo por aqui?</span>
                            <a href="https://sisand.com.br">Entre em contato</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
