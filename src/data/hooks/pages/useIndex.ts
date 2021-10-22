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
    [numberPatients, setNumberPatients] = useState(5),
    [methodInterval, setMethodInterval] = useState<any>(null);

  function seeMore(index: number) {
    if (more === index.toString()) {
      setMore('');
    } else {
      setMore(index.toString());
    }
  }

  async function getPatient(id: string) {
    if (methodInterval != null) {
      clearInterval(methodInterval);
    }
    get(id);
    var interval = setInterval(() => {
      get(id);
    }, 2000);
    setMethodInterval(interval);
  }

  async function get(id: string) {
    try {
      const { data } = await ApiService.get<PacienteInterface>(
        `/patient/${id}`
      );
      setPined(data);
    } catch {
      setErro('Errou ao pinar o paciente');
    }
  }

  async function getPatients(numberPatients: number) {
    setErro('');
    try {
      const { data } = await ApiService.get<PacienteInterface[]>(
        `/patients/${numberPatients}`
      );
      setPacientes(data);
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
