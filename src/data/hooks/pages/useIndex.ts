import PacienteInterface from 'data/@types/pacienteInterface';
import { useMemo, useState } from 'react';
import { ApiService } from 'data/services/ApiService';

export default function UseIndex() {
  const [pacientes, setPacientes] = useState<PacienteInterface[]>([]),
    [pined, setPined] = useState<PacienteInterface>(null),
    [more, setMore] = useState(''),
    [bool, setBool] = useState(false),
    [erro, setErro] = useState(''),
    [loading, setLoading] = useState(false),
    [numberPatients, setNumberPatients] = useState(5);

  function seeMore(index: number) {
    if (more === index.toString()) {
      setMore('');
    } else {
      setMore(index.toString());
    }
  }

  async function getPatient(id: string) {
    try {
      const { data } = await ApiService.get<{ patient: PacienteInterface }>(
        `/patient/${id}`
      );
      setPined(data.patient);
    } catch {
      setErro('Errou ao pinar o paciente');
    }
  }

  async function getPatients(numberPatients: number) {
    setErro('');
    try {
      const { data } = await ApiService.get<{ patients: PacienteInterface[] }>(
        `/patients/${numberPatients}`
      );
      setPacientes(data.patients);
    } catch (e) {
      setErro('Erro ao atualizar os pacientes');
    }
  }

  return {
    pined,
    pacientes,
    getPatient,
    more,
    seeMore,
    bool,
    getPatients,
    numberPatients,
    erro,
    loading,
  };
}
