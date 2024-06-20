import { useManager } from '@/hooks/useManager';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import SelectManager from './selectManager';
import SelectUsers from './selectUsers';

const formSchema = z.object({
  managerId: z.string().nonempty('Proszę wybrać managera.'),
  userId: z.string().nonempty('Proszę wybrać użytkownika.')
});

type FormValues = z.infer<typeof formSchema>;

const AssignUserToManager: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedManager, setSelectedManager] = useState<string | null>(null);

  const { assignManager } = useManager();

  useEffect(() => {
    if (selectedUser) {
      setValue('userId', selectedUser);
    }
  }, [selectedUser, setValue]);

  useEffect(() => {
    if (selectedManager) {
      setValue('managerId', selectedManager);
    }
  }, [selectedManager, setValue]);

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      await toast.promise(
        assignManager({ managerId: data.managerId, userId: data.userId }),
        {
          pending: 'Przypisywanie managera...',
          success: 'Pomyślnie przypisano managera',
          error: 'Nie udało się przypisać managera'
        }
      );
    } catch (error) {
      console.error('Failed to assign manager:', error);
    }
  };

  return (
    <div>
      <h2 className="mb-2">Przypisz użytkownika do managera</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <label>Użytkownik</label>
          <SelectUsers
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
          <input type="hidden" {...register('userId')} />
          {errors.userId && (
            <p className="mt-1 text-red-500">{errors.userId.message}</p>
          )}
        </div>
        <div className="mb-2">
          <label>Manager</label>
          <SelectManager
            selectedManager={selectedManager}
            setSelectedManager={setSelectedManager}
          />
          <input type="hidden" {...register('managerId')} />
          {errors.managerId && (
            <p className="mt-1 text-red-500">{errors.managerId.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Przypisz
        </button>
      </form>
    </div>
  );
};

export default AssignUserToManager;
