import { zodResolver } from '@hookform/resolvers/zod';
import styles from './login-page.module.scss';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/model/auth-store';
import { useMutation } from '@tanstack/react-query';
import { loginApi } from '../../features/auth/api/login';
import { saveToken, type StorageMode } from '../../features/auth/lib/token-storage';
import LogoIcon from '../../shared/ui/icons/logo-icon';
import AuthInput from '../../shared/ui/auth-input/auth-input';
import UserIcon from '../../shared/ui/icons/user-icon';
import ResetIcon from '../../shared/ui/icons/reset-icon';
import PasswordIcon from '../../shared/ui/icons/password-icon';
import EyeIcon from '../../shared/ui/icons/eye-icon';

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
                <LogoIcon />
                <header className={styles.auth__header}>
                    <h1 className={styles.auth__title}>
                        Добро пожаловать!
                    </h1>
                    <p className={styles.auth__subtitle}>
                        Пожалуйста, авторизуйтесь
                    </p>
                </header>
                <form className={styles.auth__form} onSubmit={handleSubmit(onFormSubmit)} noValidate>
                    <AuthInput
                        label="Логин"
                        error={errors.login?.message}
                        leftIcon={<UserIcon />}
                        rightIcon={<ResetIcon />}
                        inputProps={{
                            id: 'login',
                            type: 'text',
                            disabled: isPending,
                            ...register('login'),
                        }}
                    />
                    <AuthInput
                        label="Пароль"
                        error={errors.password?.message}
                        leftIcon={<PasswordIcon />}
                        rightIcon={<EyeIcon />}
                        inputProps={{
                            id: 'password',
                            type: 'password',
                            disabled: isPending,
                            ...register('password'),
                        }}
                    />
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

