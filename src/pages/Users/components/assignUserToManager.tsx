import axios from 'axios';
import React, { useState } from 'react';

import SelectManager from './selectManager';
import SelectUsers from './selectUsers';

const assignUserToManager: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedManager, setSelectedManager] = useState<string | null>(null);
  const [assignmentStatus, setAssignmentStatus] = useState<string>('');

  const handleAssign = async () => {
    if (selectedUser && selectedManager) {
      try {
        const response = await axios.post(
          `/users/assignManager/${selectedManager}/${selectedUser}`
        );
        if (response.status === 200) {
          setAssignmentStatus('Pomyślnie przypisano użytkownika do managera.');
        } else {
          setAssignmentStatus(
            'Wystąpił błąd podczas przypisywania użytkownika do managera.'
          );
        }
      } catch (error) {
        setAssignmentStatus(
          'Wystąpił błąd podczas przypisywania użytkownika do managera.'
        );
      }
    } else {
      setAssignmentStatus('Proszę wybrać zarówno użytkownika, jak i managera.');
    }
  };

  return (
    <div>
      <h2>Przypisz użytkownika do managera</h2>
      <SelectUsers
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <SelectManager
        selectedManager={selectedManager}
        setSelectedManager={setSelectedManager}
      />
      <button
        onClick={handleAssign}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Przypisz
      </button>
      {assignmentStatus && <p className="mt-4">{assignmentStatus}</p>}
    </div>
  );
};

export default assignUserToManager;
