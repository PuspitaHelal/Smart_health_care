import React, { useState, useEffect } from 'react';
import { LineChart, XAxis, YAxis, Line, CartesianGrid, Tooltip, Legend } from "recharts";

interface Patient {
  id: number;
  email: string;
}

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
}

interface Reminder {
  id: number;
  medicationId: number;
  time: string;
}

const initialPatients: Patient[] = [
  { id: 1, email: 'patient1@example.com' },
  { id: 2, email: 'patient2@example.com' },
];

const initialMedications: Medication[] = [
  { id: 1, name: 'Medication 1', dosage: '10mg', frequency: 'Daily' },
  { id: 2, name: 'Medication 2', dosage: '20mg', frequency: 'Twice a day' },
];

const initialReminders: Reminder[] = [
  { id: 1, medicationId: 1, time: '08:00' },
  { id: 2, medicationId: 2, time: '12:00' },
];

function App() {
  const [patients, setPatients] = useState(initialPatients);
  const [medications, setMedications] = useState(initialMedications);
  const [reminders, setReminders] = useState(initialReminders);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [newMedication, setNewMedication] = useState({ name: '', dosage: '', frequency: '' });
  const [newReminder, setNewReminder] = useState({ medicationId: 0, time: '' });

  useEffect(() => {
    if (email === 'admin@example.com' && password === 'password') {
      setIsAdmin(true);
    }
  }, [email, password]);

  const handleLogin = () => {
    if (email === 'admin@example.com' && password === 'password') {
      setIsAdmin(true);
    }
  };

  const handleAddPatient = () => {
    const newPatient: Patient = { id: patients.length + 1, email: email };
    setPatients([...patients, newPatient]);
    setEmail('');
  };

  const handleEditPatient = (id: number) => {
    const updatedPatients = patients.map((patient) => {
      if (patient.id === id) {
        return { ...patient, email: email };
      }
      return patient;
    });
    setPatients(updatedPatients);
    setEmail('');
  };

  const handleDeletePatient = (id: number) => {
    const updatedPatients = patients.filter((patient) => patient.id !== id);
    setPatients(updatedPatients);
  };

  const handleAddMedication = () => {
    const newMedicationObject: Medication = { id: medications.length + 1, name: newMedication.name, dosage: newMedication.dosage, frequency: newMedication.frequency };
    setMedications([...medications, newMedicationObject]);
    setNewMedication({ name: '', dosage: '', frequency: '' });
  };

  const handleAddReminder = () => {
    const newReminderObject: Reminder = { id: reminders.length + 1, medicationId: newReminder.medicationId, time: newReminder.time };
    setReminders([...reminders, newReminderObject]);
    setNewReminder({ medicationId: 0, time: '' });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Smart Health Care System</h1>
      {isAdmin ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <div className="flex flex-wrap justify-center mb-4">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4"></div>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4"></div>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4"></div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Patients</h2>
          <ul>
            {patients.map((patient) => (
              <li key={patient.id} className="mb-2">
                <span className="text-lg">{patient.email}</span>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleEditPatient(patient.id)}>Edit</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => handleDeletePatient(patient.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Add new patient email" className="p-2 border border-gray-400 rounded mb-2" />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddPatient}>Add Patient</button>
          <h2 className="text-2xl font-bold mb-4">Medications</h2>
          <ul>
            {medications.map((medication) => (
              <li key={medication.id} className="mb-2">
                <span className="text-lg">{medication.name}</span>
              </li>
            ))}
          </ul>
          <input type="text" value={newMedication.name} onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })} placeholder="Medication name" className="p-2 border border-gray-400 rounded mb-2" />
          <input type="text" value={newMedication.dosage} onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })} placeholder="Dosage" className="p-2 border border-gray-400 rounded mb-2" />
          <input type="text" value={newMedication.frequency} onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })} placeholder="Frequency" className="p-2 border border-gray-400 rounded mb-2" />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddMedication}>Add Medication</button>
          <h2 className="text-2xl font-bold mb-4">Reminders</h2>
          <ul>
            {reminders.map((reminder) => (
              <li key={reminder.id} className="mb-2">
                <span className="text-lg">{medications.find((medication) => medication.id === reminder.medicationId)?.name} at {reminder.time}</span>
              </li>
            ))}
          </ul>
          <select value={newReminder.medicationId} onChange={(e) => setNewReminder({ ...newReminder, medicationId: parseInt(e.target.value) })} className="p-2 border border-gray-400 rounded mb-2">
            <option value="0">Select medication</option>
            {medications.map((medication) => (
              <option key={medication.id} value={medication.id}>{medication.name}</option>
            ))}
          </select>
          <input type="time" value={newReminder.time} onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })} className="p-2 border border-gray-400 rounded mb-2" />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddReminder}>Add Reminder</button>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="p-2 border border-gray-400 rounded mb-2" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="p-2 border border-gray-400 rounded mb-2" />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;