import styles from './login-page.module.scss';

export default function LoginPage() {

    return (
        <main className={styles.auth}>
            <section className={styles.auth__card}>
                <header className={styles.auth__header}>
                    <h1 className={styles.auth__title}>
                        Добро пожаловать!
                    </h1>
                    <p className={styles.auth__subtitle}>
                        Пожалуйста, авторизуйтесь
                    </p>
                </header>
                <form className={styles.auth__form}>
                    <div className={styles.auth__field}>
                        <label className={styles.auth__label} htmlFor="login">
                            Логин
                        </label>
                        <input className={styles.auth__input} id="login" name="login" />
                        <p className={styles.auth__error}></p>
                    </div>
                    <div className={styles.auth__field}>
                        <label className={styles.auth__label} htmlFor="password">
                            Пароль
                        </label>
                        <input className={styles.auth__input} id="password" name="password" type="password" />
                        <p className={styles.auth__error}></p>
                    </div>
                    <label className={styles.auth__remember}>
                        <input className={styles.auth__checkbox} type="checkbox" />
                        <span className={styles.auth__rememberText}>Запомнить данные</span>
                    </label>

                    <button className={styles.auth__submit} type="submit">
                        Войти
                    </button>

                    <div className={styles.auth__divider}>
                        <span className={styles.auth__dividerText}>или</span>
                    </div>
                    <p className={styles.auth__footer}>
                        Нет аккаунта? <a className={styles.auth__link} href="#">Создать</a>
                    </p>
                </form>
            </section>
        </main>
    );
}

