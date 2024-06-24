'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import useCompanies from '@/hooks/useCompanies';
import useUsers from '@/hooks/useUsers';
import { Contract, Role, User, UserRequest } from '@/types/User';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select';

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'Imię musi mieć co najmniej 2 litery.'
  }),
  lastName: z.string().min(2, {
    message: 'Nazwisko musi mieć co najmniej 2 litery.'
  }),
  email: z.string().email({
    message: 'Nieprawidłowy adres e-mail.'
  }),
  position: z.string().min(2, {
    message: 'Stanowisko musi mieć co najmniej 2 litery.'
  }),
  role: z.enum(['ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN'], {
    errorMap: () => ({ message: 'Niewłaściwa rola.' })
  }),
  contract: z.enum(['UMOWA_ZLECENIE', 'UMOWA_O_PRACE'], {
    errorMap: () => ({ message: 'Niewłaściwy rodzaj umowy.' })
  }),
  companyId: z.string(),
  workStart: z.date({
    required_error: 'Data rozpoczęcia pracy jest wymagana.'
  })
});

interface UserFormProps {
  user?: User;
  isOpen: boolean;
  onOpenChange(open: boolean): void;
}

export function UserForm({ user, isOpen, onOpenChange }: UserFormProps) {
  const form = useForm<UserRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: user
      ? {
          companyId: user.companyDto.id,
          ...user
        }
      : {
          firstName: '',
          lastName: '',
          email: '',
          role: Role.USER, // Default value
          position: '',
          contract: Contract.PRACA, // Default value
          companyId: '',
          workYears: 0,
          workStart: new Date()
        }
  });

  const [workStart, setWorkStart] = React.useState<Date>(new Date());
  const { createUser, editUser } = useUsers(); // Hook to add user
  const { companies, companiesLoading, companiesError } = useCompanies();

  const onSubmit: SubmitHandler<UserRequest> = async data => {
    // Assuming workStart is a date string
    console.log(data);
    data.workStart = workStart;

    if (user) {
      editUser(data).then(() => toast.success('Pomyślnie zedytowano dane!'));
    } else {
      createUser(data)
        .then(() => {
          toast.success('Pomyślnie dodano!');
        })
        .catch(error => {
          console.error('Failed to add user:', error);
          toast.error('Wystąpił błąd podczas dodawania użytkownika');
        });
    }
    onOpenChange(false);
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Dane użytkownika</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2 h-full">
            <div className="flex justify-center items-center h-fit  overflow-auto p-5">
              <div className="w-full ">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Imię</FormLabel>
                          <FormControl>
                            <Input placeholder="Imię" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nazwisko</FormLabel>
                          <FormControl>
                            <Input placeholder="Nazwisko" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="example@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="position"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stanowisko</FormLabel>
                          <FormControl>
                            <Input placeholder="stanowisko" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contract"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rodzaj umowy</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Rodzaj umowy" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value={Contract.ZLECENIE}>
                                  Umowa zlecenie
                                </SelectItem>
                                <SelectItem value={Contract.PRACA}>
                                  Umowa o pracę
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Funkcja</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Funkcja" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ROLE_USER">
                                  Użytkownik
                                </SelectItem>
                                <SelectItem value="ROLE_MANAGER">
                                  Manager
                                </SelectItem>
                                <SelectItem value="ROLE_ADMIN">
                                  Administracja
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Firma</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Firma" />
                              </SelectTrigger>
                              <SelectContent>
                                {companiesLoading ? (
                                  <SelectItem value="" disabled>
                                    Ładowanie...
                                  </SelectItem>
                                ) : companiesError ? (
                                  <SelectItem value="" disabled>
                                    Błąd ładowania danych
                                  </SelectItem>
                                ) : (
                                  companies.map(company => (
                                    <SelectItem
                                      key={company.id}
                                      value={company.id}>
                                      {company.name}
                                    </SelectItem>
                                  ))
                                )}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="workStart"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data rozpoczęcia pracy</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full">
                                {workStart
                                  ? workStart.toLocaleDateString()
                                  : 'Wybierz datę'}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent side="top">
                              <Calendar
                                mode="single"
                                selected={workStart}
                                onSelect={date => {
                                  setWorkStart(date || new Date());
                                  field.onChange(date || new Date());
                                }}
                                className="rounded-md border w-full"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="col-span-1 md:col-span-2  p-1">
                      <DialogFooter className="sm:justify-end">
                        <DialogClose asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-1/2">
                            Zamknij
                          </Button>
                        </DialogClose>

                        <Button type="submit" className="w-1/2">
                          Zapisz
                        </Button>
                      </DialogFooter>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { Form };
