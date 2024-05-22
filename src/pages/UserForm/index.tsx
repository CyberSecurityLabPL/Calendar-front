'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
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
import { CompanyDto } from '@/types/Company';
import { Contract, Role, User, UserRequest } from '@/types/User';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../components/ui/select';

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.'
  }),
  lastName: z.string().min(2, {
    message: 'Last name must be at least 2 characters.'
  }),
  email: z.string().email({
    message: 'Invalid email address.'
  }),
  position: z.string().min(2, {
    message: 'Position must be at least 2 characters.'
  }),
  role: z.enum(['ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN'], {
    errorMap: () => ({ message: 'Invalid role.' })
  }),
  contract: z.enum(['UMOWA_ZLECENIE', 'UMOWA_O_PRACE'], {
    errorMap: () => ({ message: 'Invalid contract type.' })
  }),
  companyId: z.string(),
  workStart: z.date({
    required_error: 'Work start date is required.'
  })
});

interface UserFormProps {
  user?: User;
  isOpen: boolean;
  onOpenChange(open: boolean): void;
}

export function UserForm({ user, isOpen, onOpenChange }: UserFormProps) {
  const queryClient = useQueryClient();
  const form = useForm<UserRequest>({
    //resolver: zodResolver(formSchema),
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
    const workYears = new Date().getFullYear() - workStart.getFullYear();

    if (user) {
      editUser(data).then(() => toast.success('Pomyślnie zedytowano dane!'));
    } else {
      createUser(data).then(() => {
        toast.success('Pomyślnie dodano!');
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
                                  Menager
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
                              <Button variant="outline">
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
                    <div className="col-span-1 md:col-span-2  p-2">
                      <Button type="submit" className="w-full">
                        Zapisz
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { Form };
