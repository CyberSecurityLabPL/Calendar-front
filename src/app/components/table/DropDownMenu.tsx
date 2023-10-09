import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Edit, Link, More, Trash } from 'iconsax-react';
import { useResendLink } from '@/app/hooks/activation/useResendLink';
import { toast } from 'react-hot-toast';
import { useDeleteUser } from '@/app/hooks/user/useDeleteUser';
import { useEditUserModal } from '@/app/hooks/useEditUserModal';

export interface DropDownMenuProps {
    user: any;
    setUserToEdit: (user: any) => void;
    userId: number;
}

export const DropDownMenu = ({ user, setUserToEdit, userId }: DropDownMenuProps) => {

    const { deleteUser } = useDeleteUser();
    const { resendLink } = useResendLink();
    const { email } = user;
    
    
    const handleResendLink = async () => {
        try {
            const resendLinkData = await resendLink.mutateAsync(email);
            toast.success('Wysłano ponownie zaproszenie');
        } catch (error) {
            console.error('Error during resending link:', error);
            toast.error('Nie udało się wysłać zaproszenia');
        }
    }

   const handleDeleteUser = async () => {
    try {
        const deleteUserData = await deleteUser.mutateAsync(userId);
        toast.success('Użytkownik został usunięty');
    } catch (error) {
        console.error('Error during deleting user:', error);
        toast.error('Nie udało się usunąć użytkownika');
    }
   }

    return (
        <>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center outline-none"
                        aria-label="Customise options">
                        <More />
                    </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        className=" flex flex-col gap-3 min-w-[220px] bg-white rounded-lg p-2 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                        sideOffset={5}>
                        <DropdownMenu.Item className="group text-base leading-none text-[#737373] rounded-[3px] flex items-center h-[25px] px-[5px] relative select-none outline-none">
                            <button onClick={handleDeleteUser}>
                                Usuń użytkownika{' '}
                            </button>
                            <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                                <Trash className='text-black' size={20} />
                            </div>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="group text-base text-[#737373] rounded-[3px] flex items-center h-[25px] px-[5px] relative select-none outline-none data-[disabled]:pointer-events-none">
                            <button onClick={() => setUserToEdit({...user, userId: userId})}>
                                Edytuj dane{' '}
                            </button>
                            <div className="ml-auto pl-[20px]">
                                <Edit className="text-black" size={20} />
                            </div>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item className="group text-base text-[#737373] rounded-[3px] flex items-center h-[25px] px-[5px] relative select-none outline-none data-[disabled]:pointer-events-none">
                            <button onClick={handleResendLink}>
                                Ponów zaproszenie{' '}
                            </button>
                            <div className="ml-auto pl-[20px]">
                                <Link className="text-black" size={20} />
                            </div>
                        </DropdownMenu.Item>
                        <DropdownMenu.Arrow className="fill-white" />
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </>
    );
};