import { ModeToggle } from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { URLS } from '@/config/urls';
import { Axios } from '@/utils/Axios';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { LoginFormInputs } from './types/LoginFormInputs';

export function LoginPage() {
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>();
  // const { reason } = useSearch();
  const navigate = useNavigate({ from: '/login' });

  const onSubmit: SubmitHandler<LoginFormInputs> = data => {
    setLoading(true);
    Axios.post(URLS.LOGIN(), {
      email: data.username,
      password: data.password
    })
      .then(() => {
        Axios.get(URLS.ME()).then(res => {
          localStorage.setItem('user', JSON.stringify(res.data));
          setLoading(false);
          navigate({ to: '/me' });
        });
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
        toast.error('Niepoprawny login lub hasło!');
      });
  };

  // useEffect(() => {
  //   if (reason === 'session-expired') {
  //     toast.error('Twoja sesja wygasła. Zaloguj się ponownie.');
  //   } else if (reason === 'logged-out') {
  //     toast.info('Zostałeś wylogowany.');
  //   }
  // }, [reason]);

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Logowanie</CardTitle>
          <CardDescription>
            Poniżej wprowadź swoją nazwę użytkownika, aby zalogować się do
            swojego konta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="grid gap-2 mb-2">
                <Label htmlFor="username">Nazwa użytkownika</Label>
                <Input
                  id="username"
                  {...register('username', {
                    required: 'To pole jest wymagane!'
                  })}
                />
                {errors.username && (
                  <span className="text-red-500 text-sm">
                    {errors.username.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2 mb-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Hasło</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'To pole jest wymagane!'
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                Zaloguj
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
      <div className="absolute right-5 top-5">
        <ModeToggle />
      </div>
    </div>
  );
}
