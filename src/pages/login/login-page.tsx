import { zodResolver } from '@hookform/resolvers/zod';
import styles from './login-page.module.scss';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
    login: z.string().min(1, 'Введите логин'),
    password: z.string().min(1, 'Введите пароль'),
    remember: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { login: '', password: '', remember: false }
    });

    const onFormSubmit = (data: FormValues) => {
        console.log(data);
    };


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
                <form className={styles.auth__form} onSubmit={handleSubmit(onFormSubmit)} noValidate>
                    <div className={styles.auth__field}>
                        <label className={styles.auth__label} htmlFor="login">
                            Логин
                        </label>
                        <input className={styles.auth__input} id="login" {...register('login')} />
                        <p className={styles.auth__error}>{errors.login?.message}</p>
                    </div>
                    <div className={styles.auth__field}>
                        <label className={styles.auth__label} htmlFor="password">
                            Пароль
                        </label>
                        <input className={styles.auth__input} id="password" type="password" {...register('password')} />
                        <p className={styles.auth__error}>{errors.password?.message}</p>
                    </div>
                    <label className={styles.auth__remember}>
                        <input className={styles.auth__checkbox} type="checkbox" {...register('remember')} />
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

