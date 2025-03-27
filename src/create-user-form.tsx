import React, { useState, type CSSProperties, type Dispatch, type SetStateAction } from 'react';

interface CreateUserFormProps {
  setUserWasCreated: Dispatch<SetStateAction<boolean>>;
}

function CreateUserForm({ }: CreateUserFormProps) {
  const [payload, setPayload] = useState({
    username: '',
    password: ''
  });

  function handleInputChange(field: keyof typeof payload, value: string) {
    setPayload((previousPayload) => ({
      ...previousPayload,
      [field]: value
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const requestBody = payload;
      const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiYm9sZGVycGhpbEBnbWFpbC5jb20iXSwiaXNzIjoiaGVubmdlLWFkbWlzc2lvbi1jaGFsbGVuZ2UiLCJzdWIiOiJjaGFsbGVuZ2UifQ.H1WlRIgkkATepQg2ij-qtSeIVRnQs5B7JQh8zHhj7TY';
      const apiUrl = 'https://api.challenge.hennge.com/password-validation-challenge-api/001/challenge-signup';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(requestBody)
      });

      const result = await response.json();
      console.log('User created successfully', result);
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div style={formWrapper}>
      <form style={form} onSubmit={handleSubmit}>
        {/* make sure the username and password are submitted */}
        {/* make sure the inputs have the accessible names of their labels */}
        <label style={formLabel} htmlFor='username'>Username</label>
        <input style={formInput} id='username' type='text' value={payload.username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleInputChange('username', e.target.value)}} />

        <label style={formLabel} htmlFor='password'>Password</label>
        <input style={formInput} id='password' type='password' value={payload.password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {handleInputChange('password', e.target.value)}} />

        <button style={formButton}>Create User</button>
      </form>
    </div>
  );
}

export { CreateUserForm };

const formWrapper: CSSProperties = {
  maxWidth: '500px',
  width: '80%',
  backgroundColor: '#efeef5',
  padding: '24px',
  borderRadius: '8px',
};

const form: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const formLabel: CSSProperties = {
  fontWeight: 700,
};

const formInput: CSSProperties = {
  outline: 'none',
  padding: '8px 16px',
  height: '40px',
  fontSize: '14px',
  backgroundColor: '#f8f7fa',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  borderRadius: '4px',
};

const formButton: CSSProperties = {
  outline: 'none',
  borderRadius: '4px',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  backgroundColor: '#7135d2',
  color: 'white',
  fontSize: '16px',
  fontWeight: 500,
  height: '40px',
  padding: '0 8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '8px',
  alignSelf: 'flex-end',
  cursor: 'pointer',
};
