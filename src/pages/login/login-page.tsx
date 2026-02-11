import { zodResolver } from '@hookform/resolvers/zod';
import styles from './login-page.module.scss';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/model/auth-store';
import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../../features/auth/api/login';
import { saveToken, type StorageMode } from '../../features/auth/lib/token-storage';

const schema = z.object({
    login: z.string().min(1, 'Введите логин'),
    password: z.string().min(1, 'Введите пароль'),
    remember: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
    const navigate = useNavigate();
    const setToken = useAuthStore((store) => store.setToken);


    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { login: '', password: '', remember: false }
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (values: FormValues) =>
            loginApi({
                username: values.login,
                password: values.password
            }),
        onSuccess: (token, values) => {
            const mode: StorageMode = values.remember ? 'persist' : 'session';
            saveToken(token, mode);
            setToken(token);
            navigate('/products', { replace: true });
        },
        onError: () => {
            setError('login', { type: 'server', message: 'Неверный логин или пароль' });
            setError('password', { type: 'server', message: 'Неверный логин или пароль' });

        }

    });

    const onFormSubmit = (data: FormValues) => {
        mutate(data);
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
                        <input className={styles.auth__input} id="login" {...register('login')} disabled={isPending} />
                        <p className={styles.auth__error}>{errors.login?.message}</p>
                    </div>
                    <div className={styles.auth__field}>
                        <label className={styles.auth__label} htmlFor="password">
                            Пароль
                        </label>
                        <input className={styles.auth__input} id="password" type="password" {...register('password')} disabled={isPending} />
                        <p className={styles.auth__error}>{errors.password?.message}</p>
                    </div>
                    <label className={styles.auth__remember}>
                        <input className={styles.auth__checkbox} type="checkbox" {...register('remember')} />
                        <span className={styles.auth__rememberText}>Запомнить данные</span>
                    </label>

                    <button className={styles.auth__submit} type="submit" disabled={isPending}>
                        {isPending ? 'Входим...' : 'Войти'}
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

